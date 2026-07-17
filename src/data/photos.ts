import type { ImageMetadata } from 'astro';

import imgKruhac from '../assets/lekce/kruhac-01.jpg';
import imgKruhacDetail from '../assets/lekce/kruhac-09.jpg';
import imgSilovy from '../assets/lekce/silovy-trenink-09.jpg';
import imgSilovyDetail from '../assets/lekce/silovy-trenink-11.jpg';
import imgPowerZone from '../assets/lekce/silovy-trenink-08.jpg';
import imgVlastniVaha from '../assets/lekce/vlastni-vaha-01.jpg';
import imgVlastniVahaDetail from '../assets/lekce/vlastni-vaha-02.jpg';
import imgSupermamky from '../assets/supermamky/supermamky-01.jpg';
import imgObjevovarna from '../assets/deti/objevovarna-01.jpg';
import imgCirkusovaSkolicka from '../assets/deti/cirkusova-skolicka-02.jpg';
import imgCirkusovaSkolickaDetail from '../assets/deti/cirkusova-skolicka-03.jpg';

export type Photo = { src: ImageMetadata; alt: string; pos?: string; srcDetail?: ImageMetadata; altDetail?: string };

// Centrální registr fotek pro lekce a dětské aktivity — klíč = id z classes[]/
// kidsActivities[]/kidsBand[] (src/data/home.ts). Fotka se přidá JEDNOU sem a
// objeví se všude, kde se dané id používá (HP, rozcestník, detail, EN mutace).
// Chybí-li id v mapě, ClassCard/MediaFrame samy spadnou na placeholder rámeček.
//
// srcDetail/altDetail = volitelná DRUHÁ fotka pro skutečnou detailní stránku
// (/skupinove-lekce/, /krouzky-pro-deti/…), aby HP/rozcestník a detail
// neukazovaly identický záběr — jen tam, kde máme z natáčení víc dobrých
// fotek stejné aktivity. Bez srcDetail detail spadne na src (žádná regrese).
export const photosCS: Record<string, Photo> = {
  kruhac:           { src: imgKruhac,      alt: 'Kruháč v sále BoHeMi — skupina cvičí na stanovištích', srcDetail: imgKruhacDetail, altDetail: 'Kruháč v BoHeMi — úder perlíkem do pneumatiky na stanovišti' },
  'silovy-trenink': { src: imgSilovy,      alt: 'Silový trénink v BoHeMi — dřep s osou pod vedením trenéra', srcDetail: imgSilovyDetail, altDetail: 'Silový trénink v BoHeMi — skupina cvičí na TRX a s činkami' },
  'power-zone':     { src: imgPowerZone,   alt: 'Power Zone v BoHeMi — funkční silový trénink s kettlebellem', pos: 'object-[50%_30%]' },
  'vlastni-vaha':   { src: imgVlastniVaha, alt: 'Trénink s vlastní vahou v sále BoHeMi', srcDetail: imgVlastniVahaDetail, altDetail: 'Trénink s vlastní vahou v BoHeMi — skupina v podpěru na lokty' },
  supermamky:       { src: imgSupermamky,  alt: 'Supermamky — máma cvičí s dítětem v sále BoHeMi' },
  objevovarna:      { src: imgObjevovarna, alt: 'Objevovárna — dítě na pohybové stanici v BoHeMi' },
  'cirkusova-skolicka': { src: imgCirkusovaSkolicka, alt: 'Cirkusová školička — dítě na houpačce s trenérkou v sále BoHeMi', srcDetail: imgCirkusovaSkolickaDetail, altDetail: 'Cirkusová školička — děti a rodiče při hodině v sále BoHeMi' },
};

export const photosEN: Record<string, Photo> = {
  kruhac:           { src: imgKruhac,      alt: 'Circuit training at BoHeMi — group working through stations', srcDetail: imgKruhacDetail, altDetail: 'Circuit training at BoHeMi — sledgehammer station on a tyre' },
  'silovy-trenink': { src: imgSilovy,      alt: "Strength training at BoHeMi — barbell squat under a coach's eye", srcDetail: imgSilovyDetail, altDetail: 'Strength training at BoHeMi — group working on TRX and dumbbells' },
  'power-zone':     { src: imgPowerZone,   alt: 'Power Zone at BoHeMi — functional strength training with a kettlebell', pos: 'object-[50%_30%]' },
  'vlastni-vaha':   { src: imgVlastniVaha, alt: 'Bodyweight training at BoHeMi', srcDetail: imgVlastniVahaDetail, altDetail: 'Bodyweight training at BoHeMi — group holding a plank' },
  supermamky:       { src: imgSupermamky,  alt: 'Supermums — a mum training with her child at BoHeMi' },
  objevovarna:      { src: imgObjevovarna, alt: 'Discovery Room — a child at a movement station at BoHeMi' },
  'cirkusova-skolicka': { src: imgCirkusovaSkolicka, alt: 'Circus School — a child on the swing with a coach at BoHeMi', srcDetail: imgCirkusovaSkolickaDetail, altDetail: 'Circus School — kids and parents during a class at BoHeMi' },
};
