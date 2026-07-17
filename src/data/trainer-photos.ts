import imgKlaraMechurova from '../assets/treneri/klara-mechurova.jpg';
import imgKlaraMechurova02 from '../assets/treneri/klara-mechurova-02.jpg';
import imgKlaraMechurova03 from '../assets/treneri/klara-mechurova-03.jpg';
import imgKlaraMechurova04 from '../assets/treneri/klara-mechurova-04.jpg';
import imgKlaraMechurova05 from '../assets/treneri/klara-mechurova-05.jpg';
import imgKlaraMechurova06 from '../assets/treneri/klara-mechurova-06.jpg';
import imgJanHezina from '../assets/treneri/jan-hezina-01.jpg';
import imgJanHezina02 from '../assets/treneri/jan-hezina-02.jpg';
import imgJanHezina03 from '../assets/treneri/jan-hezina-03.jpg';
import imgJanHezina04 from '../assets/treneri/jan-hezina-04.jpg';

export const trainerPhotos: Record<string, ImageMetadata> = {
  'Klára Měchurová': imgKlaraMechurova,
  'Jan Hezina': imgJanHezina,
};

// Galerie dalších fotek pod bio na /treneri/ detailu — VŠECHNY zpracované
// fotky daného trenéra kromě té primární (headshot výš). Chybí-li jméno
// v mapě, galerie se prostě nevykreslí (žádná regrese).
export const trainerGallery: Record<string, { src: ImageMetadata; alt: string }[]> = {
  'Klára Měchurová': [
    { src: imgKlaraMechurova02, alt: 'Klára Měchurová na aerial silku v sále BoHeMi' },
    { src: imgKlaraMechurova03, alt: 'Klára Měchurová v balanci na slackline v sále BoHeMi' },
    { src: imgKlaraMechurova04, alt: 'Klára Měchurová v BoHeMi' },
    { src: imgKlaraMechurova05, alt: 'Klára Měchurová v BoHeMi' },
    { src: imgKlaraMechurova06, alt: 'Klára Měchurová v BoHeMi' },
  ],
  'Jan Hezina': [
    { src: imgJanHezina02, alt: 'Jan Hezina v posilovně BoHeMi' },
    { src: imgJanHezina03, alt: 'Jan Hezina v sále BoHeMi' },
    { src: imgJanHezina04, alt: 'Jan Hezina v BoHeMi' },
  ],
};
