import sveltePreprocess from 'svelte-preprocess';
import path from 'path';
import netlify from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const production = !process.env.ROLLUP_WATCH;

const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  preprocess: [
    sveltePreprocess({
      sourceMap: !production,
      scss: {
        prependData: '@import "src/scss/variables.scss";',
      },
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    target: '#site-content',
    vite: {
      resolve: {
        alias: {
          $src: path.resolve('./src/'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "src/scss/variables.scss";',
          },
        },
      },
    },
    adapter: netlify(),
    prerender: {
      crawl: true,
      enabled: true,
      entries: ['*'],
      onError: 'continue',
    },
  },
};

export default config;
