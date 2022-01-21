import { readable } from 'svelte/store';

const carousels = [
  {
    id: 'frontPage',
    timer: 8000,
    fadeTimer: 2000,
    images: [
      {
        init: '/images/galleries/landscape/hogby-fyr-t.jpg',
        src: '/images/galleries/landscape/hogby-fyr-m.jpg',
      },
      {
        init: '/images/galleries/landscape/njupeskar-t.jpg',
        src: '/images/galleries/landscape/njupeskar-m.jpg',
      },
      {
        init: '/images/galleries/landscape/storstupet-bridge-t.jpg',
        src: '/images/galleries/landscape/storstupet-bridge-m.jpg',
      },
    ],
  },
];

export const carouselStore = readable(carousels);

export const getCarousel = (carouselId) => {
  const carousel = carousels.filter((carousel) => {
    return carousel.id === carouselId;
  });

  return carousel[0];
};
