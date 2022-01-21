import { writable, readable } from 'svelte/store';

/**
 * The navigation links.
 */
export const navigationStore = readable({
  pages: [
    {
      label: 'Hem',
      route: '/',
      enabled: true,
    },
    {
      label: 'Foto',
      route: '/photo',
      enabled: true,
    },
    {
      label: 'Blogg',
      route: '/blog',
      enabled: true,
    },
    {
      label: 'Om',
      route: '/about',
      enabled: true,
    },
    {
      label: 'Kontakt',
      route: '/contact',
      enabled: true,
    },
  ],
});

/**
 * This custom route keeps track of the current page route.
 */
const createRouteStore = () => {
  const { subscribe, set } = writable('/');

  return {
    subscribe,
    setRoute: (route) => set(route),
    reset: () => set('/'),
  };
};
export const routeStore = createRouteStore();

/**
 * This store keeps track of the mobile navigation menu state.
 */
const createRouteNavigationMenuStore = () => {
  const { subscribe, update, set } = writable(false);

  return {
    subscribe,
    toggleMenu: () => update((state) => !state),
    closeMenu: () => set(false),
    openMenu: () => set(true),
  };
};
export const navigationMenuStore = createRouteNavigationMenuStore();

/**
 * This custom route keeps track of the currently selected blog post index year.
 */
const createBlogYearStore = () => {
  const { subscribe, set } = writable(String(new Date().getFullYear()));

  return {
    subscribe,
    setYear: (year) => set(year),
    reset: () => set(String(new Date().getFullYear())),
  };
};
export const blogYearStore = createBlogYearStore();
