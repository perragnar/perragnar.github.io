<script>
  import { fly } from 'svelte/transition';

  // Stores.
  import {
    navigationStore,
    navigationMenuStore,
    routeStore,
  } from '$lib/stores/navigationStore';

  // Props.
  export let transitions = false;
</script>

<div class="navigation-list-wrapper">
  <ul class="navigation-list">
    {#each $navigationStore.pages as page, index}
      {#if page.enabled}
        <li
          in:fly={{
            x: -20,
            duration: transitions ? 200 : 0,
            delay: transitions ? 100 * (index + 2) : 0,
          }}
        >
          <a
            href={page.route}
            class:active={page.route === $routeStore}
            sveltekit:prefetch
            on:click={() => navigationMenuStore.closeMenu()}
          >
            {page.label}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
