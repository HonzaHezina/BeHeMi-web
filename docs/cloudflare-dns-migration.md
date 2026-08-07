# Migrace DNS z Wedosu na Cloudflare

## Stav: 🟡 probíhá (nameservery přepnuté 7. 8. 2026, čeká se na propagaci)

Doména **`bohemi.fit`** se stěhuje DNS správou z Wedosu na Cloudflare
(zdarma plán). **Hosting se nemění** — jde jen o to, kdo řídí DNS zónu:

- `bohemi.fit` / `www` → dál Astro na **Hetzneru/Coolify**
- `studio.bohemi.fit` → dál **WordPress na Wedosu**
- Wedos zůstává registrátor domény (nameservery se mění, doména se
  nepřevádí jinam)

**Motivace:** primárně možná oprava dlouhodobého Wedos ATS bugu
(`ERR_HTTP2_PROTOCOL_ERROR` na `/ucet-clenstvi/`, viz
[`wordpress/README.md`](../wordpress/README.md) sekce „`ERR_HTTP2_PROTOCOL_ERROR`
na `/ucet-clenstvi/`") — byl to tam už zapsaný „plán B", teď se realizuje.
Vedlejší bonus: CDN/cache před oběma weby, řeší i starší WebPageTest
doporučení „Bez CDN".

## DNS záznamy — zdroj pravdy (ověřeno 7. 8. 2026, přeneseno 1:1 z Wedosu)

| Typ | Name | Content | Proxy status | Poznámka |
|---|---|---|---|---|
| A | `bohemi.fit` | `162.55.52.127` | 🟠 Proxied | Astro/Hetzner |
| A | `www` | `162.55.52.127` | 🟠 Proxied | Astro/Hetzner |
| A | `studio` | `89.221.213.86` | 🟠 Proxied | WordPress/Wedos |
| A | `old` | `89.221.213.86` | 🟠 Proxied | starý web, Wedos |
| CNAME | `ftp` | `246765.w65.wedos.net` | ⚪ DNS only | **kritické** — FTP nefunguje přes proxy |
| CNAME | `key1.wedos-dkim._domainkey` | `key1.dkim-we.wedos.net` | ⚪ DNS only | DKIM podpis e-mailu (Wedos) |
| CNAME | `key2.wedos-dkim._domainkey` | `key2.dkim-we.wedos.net` | ⚪ DNS only | DKIM podpis e-mailu (Wedos) |
| CNAME | `novinky` | `sparkpostmail.com` | ⚪ DNS only | Ecomail newsletter tracking |
| MX ×3 | `bohemi.fit` | `wes1-mx1`/`wes1-mx2`/`wes1-mx-backup.wedos.net` | ⚪ DNS only | e-mail zůstává u Wedosu (Cloudflare MX proxovat neumí) |
| TXT | `ecomail._domainkey` | `v=DKIM1; k=rsa...` | ⚪ DNS only | DKIM pro Ecomail |
| TXT | `_wgp_verification` | `99e2ecfa334c5...` | ⚪ DNS only | verifikační token |

**Import poznámka:** Cloudflare automatický sken při zakládání zóny
naimportoval jen 7 z 13 záznamů (chybělo `studio`, oba `wedos-dkim`
CNAME, `novinky`, obě TXT) — zbytek se doplnil ručně. Kdyby se zóna
někdy zakládala znovu, nespoléhat na automatický scan, projít vždy
proti týhle tabulce.

## Cloudflare nastavení

- **Nameservery přidělené Cloudflare:** `ridge.ns.cloudflare.com`,
  `vera.ns.cloudflare.com`
- **SSL/TLS mód:** **Full** (ne Flexible — Flexible by u WordPressu
  s vlastním HTTPS vynucením způsobilo redirect loop)
- **DNSSEC:** nebyl a není aktivní (Wedos ho ani nedovolí zapnout, dokud
  doména používá jejich vlastní DNS servery) — nebyl důvod k žádnému
  kroku před přepnutím
- **AI Crawl Control** (Search/Agent povoleno, Training ponecháno
  blokované) — kosmetická volba, nesouvisí s funkčností

## Rollback

Pokud by po propagaci něco nefungovalo (web, e-mail, FTP):

1. Ve Wedosu → doména `bohemi.fit` → „Změna DNS serverů" → zpět na
   **„Výchozí DNS servery WEDOS"** (`ns.wedos.cz`, `ns.wedos.eu`,
   `ns.wedos.com`, `ns.wedos.net`)
2. Stejné zpoždění propagace jako u přechodu (Wedos avizuje min. 6 h,
   Cloudflare typicky 1–2 h) — rollback není okamžitý
3. DNS záznamy v Cloudflare zůstávají netknuté, není potřeba je mazat

## Po potvrzení, že migrace běží stabilně

- [ ] Ověřit, jestli se tím vyřešil `ERR_HTTP2_PROTOCOL_ERROR` na
      `/ucet-clenstvi/` (opakovat `curl` test z
      [`wordpress/README.md`](../wordpress/README.md), případně
      ruční klikací test v prohlížeči) — aktualizovat tamní sekci
      s výsledkem
- [ ] Zvážit „Only allow Cloudflare IP addresses at your origin"
      (firewall na Hetzneru/Wedosu) — volitelné zpřísnění, ne nutné
- [ ] Aktualizovat `CLAUDE.md` sekci „Nasazení", až bude stav trvale
      potvrzený jako Active
