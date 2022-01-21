<script>
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { preloadImages } from '$lib/functions/helperFunctions';

  // Components.
  import Clamp from '$lib/components/Clamp.svelte';

  // Props.
  export let images = null;
  export let faded = false;
  export let size = 'large';
  export let blur = false;
  export let semiTransparent = false;
  export let mode = 'random'; // 'random', 'carousel'

  // Randomize the first image index.
  const randomizeInitialIndex = true;

  // The image to render.
  let currentImage = null;

  // Carousel stuff.
  const carouselTimer = 5000;
  const carouselAutoPlay = false;
  let transitionDuration = 0;
  let carouselIndex = randomizeInitialIndex ? Math.floor(Math.random() * images.length) : 0;
  let carouselInterval;

  // The duration of the transition timer.
  transitionDuration = 1000;

  // Checking for image array.
  // If array, then randomize the image.
  if (images && Array.isArray(images) && mode === 'random') {
    currentImage = images[Math.floor(Math.random() * images.length)];
  } else {
    currentImage = images;
  }

  // Hero sizes.
  const heroSizes = ['full', 'half', 'small', 'large'];

  // Fallback to 'large' if entered size isn't available.
  if (!heroSizes.includes(size)) {
    size = 'large';
  }

  // Hero styling.
  let componentAttributes = {
    class: ['hero', `hero--${size}`],
    style: [],
  };

  // Stringinfy the attributes.
  componentAttributes.class = componentAttributes.class.join(' ');
  componentAttributes.style = componentAttributes.style.join(' ');

  /**
   * Loading an hero image.
   */
  const showImage = async () => {
    currentImage = images[carouselIndex];
  };

  /**
   * Starting the carousel.
   */
  const startCarousel = () => {
    // TODO: Preload images.

    showImage();

    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      carouselIndex += 1;

      // Resetting the index on last image index.
      if (carouselIndex >= images.length) {
        carouselIndex = 0;
      }

      showImage();
    }, carouselTimer);
  };

  // Carousel.
  if (mode === 'carousel' && images && Array.isArray(images)) {
    // Starting the carousel.
    if (carouselAutoPlay) {
      startCarousel();
    } else {
      showImage();
    }

    onDestroy(() => {
      clearInterval(carouselInterval);
    });
  }
</script>

<div {...componentAttributes} class:hero--fade-out-bottom={currentImage && faded}>
  <div class="hero__fader" />
  <Clamp clampType="hero">
    <div class="hero-content">
      <slot />
    </div>
  </Clamp>
  {#if mode === 'carousel'}
    <div class="carousel-navigation">
      {#each images as image, index}
        <div class="carousel-navigation__item" class:carousel-navigation__item--active={index === carouselIndex}>
          <div
            class="carousel-navigation__item__dot"
            on:click={() => {
              carouselIndex = index;
              showImage();

              if (carouselAutoPlay) {
                startCarousel();
              }
            }}
            data-image-index={index}
          />
        </div>
      {/each}
    </div>
  {/if}
  {#if currentImage}
    {#key currentImage}
      <div
        class="hero-image"
        style={currentImage ? `background-image: url(${currentImage});` : ''}
        class:hero--blur={blur}
        class:hero--semi-transparent={semiTransparent}
        transition:fade={{ duration: mode === 'carousel' ? transitionDuration : 0 }}
      />
    {/key}
  {:else}
    <div class="hero-image hero-image--placeholder" style="background-image: url('/images/logotype.svg');" />
  {/if}
</div>

<style type="scss">
  .hero {
    position: relative;
    min-height: -webkit-fill-available;
    overflow: hidden;
    margin-bottom: 2rem;
    clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 5vw), 0% 100%);

    &--full {
      height: 100vh;
    }

    &--half {
      height: 50vh;
    }

    &--small {
      height: 25vh;
    }

    &--large {
      height: 75vh;
    }

    &--blur {
      filter: blur(20px);
    }

    &--semi-transparent {
      opacity: 0.25;
    }

    &--fade-out-bottom {
      clip-path: none;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        min-height: 20%;
        background: transparent;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(32, 32, 35) 100%);
      }
    }

    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      margin: 0;
      padding: 1em;
      font-family: $fontPunch;
      font-weight: bold;
      font-size: 2em;
      line-height: 1.5;
      z-index: 1;
      color: $colorWhite;

      @media (max-width: 768px) {
        font-size: 1.5em;
        width: 100%;
      }
    }

    .carousel-navigation {
      position: absolute;
      z-index: 1;
      left: 50%;
      bottom: 2rem;
      transform: translateX(-50%);
      display: flex;
      align-items: center;

      &__item {
        padding: 5px;
        line-height: 1;

        &__dot {
          $dotSize: 12px;
          display: inline-block;
          width: $dotSize;
          height: $dotSize;
          border-radius: $dotSize;
          background-color: transparent;
          border: solid 2px transparentize($colorWhite, 0.5);
          transition: border-color 500ms ease, background-color 500ms ease;
        }

        &:hover {
          cursor: pointer;

          .carousel-navigation__item__dot {
            border-color: transparentize($colorWhite, 0.75);
          }
        }

        &--active {
          .carousel-navigation__item__dot {
            border-color: $colorWhite;
            background-color: $colorWhite;
          }
        }
      }
    }

    &-image {
      position: absolute;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;

      &--placeholder {
        background-size: 40vw;
        opacity: 0.02;
      }
    }

    &__fader {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;

      &::before {
        content: '';
        display: block;
        flex: 1;
        background: rgb(0, 0, 0);
        background: linear-gradient(180deg, rgba(0 0 0 / 50%) 0%, rgba(0 0 0 / 0%) 20%);
      }
    }
  }

  :global.hero .header {
    display: inline-block;
    padding: 0.3ch 0.5ch;
    border-radius: 0.1ch;
    background: $colorYellow;
    text-shadow: 0.1ch 0.1ch 0 rgba(0 0 0 / 50%);
  }
</style>
