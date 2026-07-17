import imgKlaraMechurova from '../assets/treneri/klara-mechurova.jpg';
import imgKlaraMechurova02 from '../assets/treneri/klara-mechurova-02.jpg';
import imgKlaraMechurova03 from '../assets/treneri/klara-mechurova-03.jpg';
import imgJanHezina from '../assets/treneri/jan-hezina-01.jpg';
import imgJanHezina02 from '../assets/treneri/jan-hezina-02.jpg';

export const trainerPhotos: Record<string, ImageMetadata> = {
  'Klára Měchurová': imgKlaraMechurova,
  'Jan Hezina': imgJanHezina,
};

// Volitelná galerie 1-2 dalších fotek pod bio na /treneri/ detailu — jen tam,
// kde máme z natáčení víc dobrých záběrů stejného trenéra. Chybí-li jméno
// v mapě, galerie se prostě nevykreslí (žádná regrese).
export const trainerGallery: Record<string, { src: ImageMetadata; alt: string }[]> = {
  'Klára Měchurová': [
    { src: imgKlaraMechurova02, alt: 'Klára Měchurová na aerial silku v sále BoHeMi' },
    { src: imgKlaraMechurova03, alt: 'Klára Měchurová v balanci na slackline v sále BoHeMi' },
  ],
  'Jan Hezina': [
    { src: imgJanHezina02, alt: 'Jan Hezina v posilovně BoHeMi' },
  ],
};
