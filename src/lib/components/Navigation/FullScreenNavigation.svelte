<script>
  import { slide } from 'svelte/transition';

  // Componenets.
  import NavigationList from '$lib/components/Navigation/NavigationList.svelte';
  import Hamburger from '$lib/components/PageHeader/Hamburger.svelte';

  // Stores.
  import { navigationStore, navigationMenuStore } from '$lib/stores/navigationStore';
</script>

<nav class="full-screen-navigation">
  {#if $navigationStore.pages && $navigationMenuStore}
    <div class="full-screen-navigation__wrapper" in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
      <NavigationList transitions={true} />
    </div>
  {/if}
  <button
    class="full-screen-navigation__toggle"
    class:full-screen-navigation__toggle--active={$navigationMenuStore}
    on:click={() => navigationMenuStore.toggleMenu()}
    aria-label="Sidnavigering"
  >
    <Hamburger open={$navigationMenuStore} />
  </button>
</nav>

<style type="scss">
  .full-screen-navigation {
    &__toggle {
      position: absolute;
      right: 0rem;
      top: 0;
      margin: 0.45em;
      padding: 0;
      border: none;
      background-color: transparent;
      color: inherit;
      cursor: pointer;
      z-index: 1;
      line-height: 0;

      &:focus {
        outline: none;
      }

      @media (min-width: 1024px) {
        display: none;
      }
    }

    @media (min-width: 1024px) {
      display: none;
    }

    :global.navigation-list-wrapper {
      padding: 3em 1em 1em;

      .navigation-list {
        padding: 0;
        margin: 0;
        border-radius: 3px;

        @media (min-width: 1024px) {
          display: none;
        }

        li {
          list-style: none;
          display: flex;
          justify-content: center;

          a {
            display: block;
            padding: 0.5em;
            text-decoration: none;
            color: $colorWhite;
            font-family: $fontPunch;
            font-weight: bold;
            font-size: 2em;
            line-height: 1;

            @media (max-width: 768px) {
              font-size: 1.8em;
            }

            &:hover {
              color: $colorWhite;
            }

            &.active {
              color: $colorYellow;
            }
          }
        }
      }
    }
  }
</style>
