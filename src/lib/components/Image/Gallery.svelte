<script>
  // Components.
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  // Props.
  export let maxColumns = 3;
  export let galleryLabel = null;
  export let verticalAlign = 'top';
  export let galleryType = 'masonry';

  // If the gallery type is grid, add the vertical align CSS class.
  const galleryVerticalAlign = galleryType === 'grid' ? `gallery--grid--align-${verticalAlign}` : '';
</script>

<div class="gallery-wrapper">
  {#if galleryLabel}
    <SectionHeader>
      {galleryLabel}
    </SectionHeader>
  {/if}
  <div
    class={`gallery gallery--${galleryType}--${
      maxColumns < 3 ? maxColumns : 'full'
    }  gallery--${galleryType} ${galleryVerticalAlign}`}
  >
    <slot />
  </div>
</div>

<style type="scss">
  .gallery-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
  }

  .gallery {
    &--grid {
      display: grid;
      grid-auto-flow: row;
      gap: 3rem;

      @media (max-width: 1000px) {
        gap: 2rem;
      }

      @media (max-width: 600px) {
        gap: 1rem;
      }

      &--full {
        grid-template-columns: repeat(3, 1fr);

        @media (max-width: 1000px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 500px) {
          grid-template-columns: 1fr;
        }
      }

      &--2 {
        grid-template-columns: repeat(2, 1fr);

        @media (max-width: 500px) {
          grid-template-columns: 1fr;
        }
      }

      &--1 {
        grid-template-columns: 1fr;
      }

      &--align-top {
        align-items: flex-start;
      }

      &--align-center {
        align-items: center;
      }

      &--align-bottom {
        align-items: flex-end;
      }
    }

    &--masonry {
      column-gap: 3rem;

      @media (max-width: 1000px) {
        column-gap: 2rem;
      }

      @media (max-width: 600px) {
        column-gap: 1rem;
      }

      :global.image {
        page-break-inside: avoid;
        margin: 0 0 3rem;

        @media (max-width: 1000px) {
          margin: 0 0 2rem;
        }

        @media (max-width: 600px) {
          margin: 0 0 1rem;
        }
      }

      &--full {
        column-count: 3;

        @media (max-width: 1000px) {
          column-count: 2;
        }

        @media (max-width: 500px) {
          column-count: 1;
        }
      }

      &--2 {
        column-count: 2;

        @media (max-width: 500px) {
          column-count: 1;
        }
      }

      &--1 {
        column-count: 1;
      }
    }
  }

  :global.gallery .content-container {
    margin: 0 !important;
  }
</style>
