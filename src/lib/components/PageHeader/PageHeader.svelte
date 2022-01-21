<script>
  // Components.
  import Clamp from '$lib/components/Clamp.svelte';
  import NavigationList from '$lib/components/Navigation/NavigationList.svelte';
  import FullScreenNavigation from '$lib/components/Navigation/FullScreenNavigation.svelte';
  import Logotype from '$lib/components/Logotype.svelte';

  // Stores.
  import { navigationMenuStore } from '$lib/stores/navigationStore';

  // Current scroll Y position
  let scrollYPos = 0;
</script>

<svelte:window bind:scrollY={scrollYPos} />

<header
  class="page-header"
  class:page-header--compact={scrollYPos > 50}
  class:page-header--menu-out={$navigationMenuStore}
>
  <Clamp clampType="pageHeader">
    <FullScreenNavigation />
    <div class="page-header__content">
      <a href="/" class="page-header__logo" no-decoration>
        <Logotype color="#ffffff" />
      </a>
      <nav class="page-header__navigation">
        <NavigationList />
      </nav>
    </div>
  </Clamp>
</header>

<style type="scss">
  :global.page-header {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: background-color 200ms ease, box-shadow 200ms ease;

    .clamp {
      position: relative;

      @media (max-width: 1024px) {
        padding: 0 !important;
      }

      @media (max-width: 650px) {
        max-width: 100% !important;
      }
    }

    &__content {
      border-right: solid 1px rgba(0 0 0 / 10%);
      border-bottom: solid 1px rgba(0 0 0 / 10%);
      border-left: solid 1px rgba(0 0 0 / 10%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      background-color: rgba(0 0 0 / 25%);
      transition: margin 200ms ease, border-radius 200ms ease, background-color 200ms ease;

      @media (min-width: 1024px) {
        margin: 1rem 0 0;
        border-radius: 3px;
        border-top: solid 1px rgba(0 0 0 / 10%);
      }

      @media (max-width: 650px) {
        border-left: none;
        border-right: none;
      }

      @supports ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        background-color: transparent;
        border-color: rgba(255 255 255 / 10%);
      }
    }

    &__logo {
      display: inline-block;
      padding: 1rem;
      line-height: 0;

      @media (max-width: 1024px) {
        padding: 0.7rem;
      }

      :global.logotype {
        width: 3rem;
        fill: $colorWhite;
        transition: transform 200ms ease;

        @media (max-width: 1024px) {
          width: 2.5rem;
        }
      }
    }

    &--compact {
      position: fixed;

      .clamp {
        padding: 0 !important;
        max-width: 100% !important;
      }

      .page-header__content {
        margin: 0;
        border-radius: 0;
        border: none;
        border-bottom: solid 1px rgba(0 0 0 / 10%);
        background-color: rgba(0 0 0 / 95%);

        @supports ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
          border-bottom: solid 1px rgba(255 255 255 / 10%);
          background-color: transparent;
        }
      }

      .full-screen-navigation__toggle {
        right: 0;
      }
    }

    &--menu-out {
      @media (max-width: 1024px) {
        width: 100%;
        background-color: rgba(0 0 0 / 95%);

        @supports ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          background-color: rgba(0 0 0 / 50%);
        }

        .clamp {
          padding: 0 !important;
          max-width: 100% !important;
        }

        .page-header__content {
          border: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          background-color: transparent;
        }

        .page-header__logo {
          margin: 3rem auto;

          :global.logotype {
            width: 5rem;
          }
        }
      }
    }

    &__navigation {
      display: flex;
      align-self: stretch;
      align-items: stretch;

      .navigation-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        height: 100%;

        li {
          a {
            display: flex;
            height: 100%;
            align-items: center;
            color: inherit;
            padding: 0.5em 1em;
            line-height: 1;
            font-family: $fontPunch;
            font-size: 1.2em;
            color: $colorWhite;

            &:hover {
              color: $colorWhite;
            }

            &.active {
              color: $colorYellow;
            }
          }
        }
      }

      @media (max-width: 1023px) {
        display: none;
      }
    }
  }
</style>
