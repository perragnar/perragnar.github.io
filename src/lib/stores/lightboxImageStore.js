import { writable } from 'svelte/store';

/**
 * The current lightbox image.
 */
const createLightboxImageStore = () => {
  const { subscribe, set } = writable({
    image: null,
  });

  return {
    subscribe,
    setImages: (image) =>
      set({
        image: image,
      }),
    reset: () =>
      set({
        image: null,
      }),
  };
};
export const lightboxImageStore = createLightboxImageStore();
