<script>
  import { preloadImage } from '$lib/functions/helperFunctions';
  import lazyImage from '$lib/functions/lazyImage';

  // Components.
  import ImageData from '$lib/components/Image/ImageData.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

  // Stores.
  import { lightboxImageStore } from '$lib/stores/lightboxImageStore';
  import ConditionalAnchor from '../ConditionalAnchor.svelte';

  // Props.
  export let src = null;
  export let targetSrc = null;
  export let thumbnail = null;
  export let imageData = {};
  export let index = null;
  export let alt = '';
  export let link = null;
  export let frame = 'noframe';
  export let monochrome = false;

  // Frame types.
  // Types:
  // - noframe: No frame, just the image.
  // - frame1: Black frame with white passepartout.
  const frameTypes = ['regular', 'frame1'];

  // Fallback to 'full' if entered size isn't available.
  if (!frameTypes.includes(frame)) {
    frame = 'noframe';
  }

  /**
   * Flip an image.
   */
  const flipImage = () => {
    imageFlipped = !imageFlipped;
  };

  /**
   * Open the image in a lightbox.
   */
  const showImage = () => {
    // Set the source to null or else you can't open the same image twice in a row.
    lightboxImageStore.reset();

    // Setting the lightbox image source.
    lightboxImageStore.setImages(targetSrc);
  };

  /**
   * Get image aspect ratio.
   */
  const getImageAspectRatio = () => {
    imageAspectRatio = elImage.width / elImage.height;
    imageHeightRatio = (elImage.height / elImage.width) * 100;
  };

  // If image is flipped or not.
  let imageFlipped = false;

  // Enable image data button.
  // Only show the image info button (.image__handle) if any image data exists and isn't null.
  // Checks if any imageData parameter contains a value.
  let elementDataCount = 0;
  for (const parameter in imageData) {
    if (imageData[parameter] != null) {
      elementDataCount++;
    }
  }

  // The image object.
  let elImage;

  // The image data.
  let imageAspectRatio = 1;
  let imageHeightRatio = 100;
</script>

{#if src}
  <figure class={`image image--${frame}`} class:image--action={targetSrc !== null} class:image--flipped={imageFlipped}>
    {#await preloadImage(thumbnail || src)}
      <div class="image__loading">
        <LoadingIndicator />
      </div>
    {:then}
      <div class="image__inner">
        <div class="image__front">
          {#if elementDataCount > 0}
            <div class="image__handle" on:click={flipImage}>
              <div class="image__handle__content">i</div>
            </div>
          {/if}
          <ConditionalAnchor url={link}>
            <div
              class="image__wrapper"
              on:click={() => {
                if (!link) {
                  showImage();
                }
              }}
            >
              <img
                class="image__image"
                class:image__image--monochrome={monochrome}
                src={thumbnail || src}
                data-src={src}
                data-lazyloaded={false}
                {alt}
                bind:this={elImage}
                use:lazyImage
                on:load={getImageAspectRatio}
                on:change={getImageAspectRatio}
              />
            </div>
          </ConditionalAnchor>
        </div>
        <div class="image__back">
          <div class="image__handle" on:click={flipImage}>
            <div class="image__handle__content">&times;</div>
          </div>
          <ImageData {imageData} showIcons={true} {index} />
        </div>
        <div class="pusher" style={`padding-bottom: ${imageHeightRatio}%;`} />
      </div>
    {/await}
  </figure>
{/if}

<style lang="scss">
  .image {
    position: relative;
    perspective: 1200px;

    &__loading {
      background-color: rgba(0 0 0 / 50%);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      @supports (aspect-ratio: 1) {
        aspect-ratio: 1;
      }

      @supports not (aspect-ratio: 1) {
        min-height: 150px;
      }
    }

    &__inner {
      transform-style: preserve-3d;
      will-change: transform;
      transition: transform 500ms ease;

      &:hover {
        @media (hover: hover) {
          .image__handle {
            transform: translateX(0);
          }
        }
      }
    }

    &__front,
    &__back {
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    &__front {
      .image__handle {
        &__content {
          text-shadow: 1px 1px 0 rgba(0 0 0 / 50%);
          background-color: rgba(0 0 0 / 25%);
          border-radius: 2px;
          font-size: 0.8em;
          padding: 0.5rem;
        }
      }

      :global(a) {
        display: block;
        width: 100%;
      }
    }

    &__back {
      background-color: $colorOffWhite;
      transform: rotateY(0.5turn);

      .image__handle {
        &__content {
          color: $colorDarkGray;
          font-size: 2em;
          padding: 0.2rem;
        }
      }
    }

    &--action {
      .image__front {
        cursor: pointer;
      }
    }

    &__handle {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem;
      color: $colorWhite;
      cursor: pointer;

      &__content {
        display: inline-flex;
        line-height: 1;
        user-select: none;
        font-weight: bold;
        font-family: $fontFixedWidth;
      }
    }

    &__image {
      pointer-events: none;
      user-select: none;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      transition: filter 200ms ease;

      &--monochrome {
        filter: grayscale(1);
      }
    }

    &--flipped {
      z-index: 1;
      .image__inner {
        transform: rotateY(0.5turn);
      }
    }

    &--perspective {
      transform: rotateY(-20deg);
      transition: transform 200ms ease;
      margin-top: 5rem;
      z-index: 1;

      @media (hover: hover) {
        &:hover {
          transform: rotateY(0);
        }
      }
    }

    &--frame1 {
      box-sizing: content-box;
      background-color: $colorWhite;
      padding: 8%;
      box-shadow: 0 0 10vw rgba(255 255 255 / 20%), 1rem 1rem 1rem rgba(0 0 0 / 50%), 2px 2px 1rem rgba(0 0 0 / 80%),
        inset 2px 2px 1rem rgba(0 0 0 / 80%), inset 2px 2px 0.5rem rgba(0 0 0 / 50%);

      @media (max-width: 1024px) {
        border: solid 2vw $colorBlack;
      }

      @media (min-width: 1025px) {
        border: solid 1rem $colorBlack;
      }

      .image__inner {
        position: static;

        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0.1rem 0.1rem 0.1rem rgb(0 0 0 / 20%);
        }

        .image__front {
          box-shadow: inset 0.1rem 0.1rem 0.1rem rgb(0 0 0 / 20%);
        }
      }
    }
  }
</style>
