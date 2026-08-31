# Migrace DNS z Wedosu na Cloudflare

## Stav: ✅ hotovo (7. 8. 2026)

Nameservery přepnuté a propagované rychleji, než avizoval Wedos (v řádu
hodin, ne 6+). Po přepnutí byla krátká přechodová fáze (~desítky minut),
kdy oba weby vracely `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` — Cloudflare
Universal SSL certifikát se ještě dokončoval/šířil po edge síti, i když
zóna už měla status „Active". Vyřešilo se samo bez zásahu, jakmile
certifikát doběhl. Ověřeno `curl`em i v prohlížeči: `bohemi.fit` i
`studio.bohemi.fit` vrací `200 OK` přes Cloudflare (`Server: cloudflare`
v hlavičkách), `/ucet-clenstvi/` 5× po sobě konzistentní `302` (login
redirect pro nepřihlášeného, žádná náhodná chyba).

Doména **`bohemi.fit`** se přestěhovala DNS správou z Wedosu na Cloudflare
(zdarma plán). **Hosting se neměnil** — jde jen o to, kdo řídí DNS zónu:

- `bohemi.fit` / `www` → dál Astro na **Hetzneru/Coolify**
- `studio.bohemi.fit` → dál **WordPress na Wedosu**
- Wedos zůstává registrátor domény (nameservery se změnily, doména se
  nepřevedla jinam)

**Motivace:** primárně oprava dlouhodobého Wedos ATS bugu
(`ERR_HTTP2_PROTOCOL_ERROR` na `/ucet-clenstvi/`, viz
[`wordpress/README.md`](../wordpress/README.md) sekce „`ERR_HTTP2_PROTOCOL_ERROR`
na `/ucet-clenstvi/`") — byl to tam zapsaný „plán B", teď realizovaný a
**potvrzeně funkční** (viz „Ověřeno naostro" níž). Vedlejší bonus:
CDN/cache před oběma weby, řeší i starší WebPageTest doporučení „Bez CDN".

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

## Ověřeno naostro (7. 8. 2026)

- ✅ Web — `bohemi.fit` i `studio.bohemi.fit` čisté `200 OK` přes Cloudflare
- ✅ E-mail — testovací zpráva došla v pořádku
- ✅ FTP — přihlášení funguje (Honza potvrdil)
- ✅ `ERR_HTTP2_PROTOCOL_ERROR` na `/ucet-clenstvi/` — po opakovaném
  testování se chyba znovu neukázala. Diagnóza „vadná Wedos ATS HTTP/2
  vrstva" potvrzena, zapsáno i do `wordpress/README.md`.

Migrace je tímto kompletně uzavřená, žádný ze čtyř kritických bodů
(web/e-mail/FTP/DKIM) nebyl migrací poškozen.

## Zbývá (volitelné, nic naléhavého)

- [ ] Zvážit „Only allow Cloudflare IP addresses at your origin"
      (firewall na Hetzneru/Wedosu) — volitelné zpřísnění, ne nutné

## Známý problém: stránka se občas objeví nestylovaná (stará HTML z cache)

Nahlášeno Honzou 31. 8. 2026 (příklad: `/program-8-tydnu/`) — stránka se
občas načte úplně bez CSS (holé podtržené odkazy, obří nezmenšené SVG
logo), reload ji hned opraví. **Diagnóza:** Astro hashuje CSS/JS soubory
podle obsahu (`_astro/xxxxx.css`) a každý nový deploy přepíše `dist/` —
staré hashované soubory zmizí. Pokud prohlížeč nebo Cloudflare edge cache
drží HTML z doby před posledním deployem, odkazuje na CSS, které už na
originu neexistuje → CSS spadne na 404 → stránka je nestylovaná. Tvrdý
reload stáhne aktuální HTML se správnými odkazy → vypadá v pořádku.
Objevilo se až po migraci na Cloudflare (7. 8. 2026), dřív bez CDN k tomu
nebyl prostor.

**Doporučený fix (nastavuje se v Cloudflare dashboardu, ne v repu) — zatím
NEIMPLEMENTOVÁNO, čeká na provedení:**

1. Caching → Cache Rules: HTML dokumenty (`Content-Type` `text/html`,
   resp. vše mimo `/_astro/*`) → **Bypass cache** (nebo velmi krátké TTL) —
   HTML je malé, přenačítat ho z originu při každém requestu je levné a
   zaručí vždy aktuální odkazy na assety.
2. `/_astro/*` naopak cachovat agresivně (názvy mají content-hash, jsou
   bezpečně „immutable") — dlouhé Edge/Browser TTL.
3. Než bude pravidlo z bodu 1 hotové: po každém deployi ručně „Purge
   Everything" v Cloudflare jako dočasná záplata.
