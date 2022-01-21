<script>
  import { fade } from 'svelte/transition';
  import { preloadImage } from '$lib/functions/helperFunctions.js';

  // Components.
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

  // Stores.
  import { lightboxImageStore } from '$lib/stores/lightboxImageStore';
</script>

{#if $lightboxImageStore.image}
  <div class="lightbox" transition:fade on:click={() => lightboxImageStore.reset()}>
    <div class="lightbox__image-wrapper" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
      {#await preloadImage($lightboxImageStore.image)}
        <div class="image__loading">
          <LoadingIndicator />
        </div>
      {:then}
        <img class="lightbox__image" src={$lightboxImageStore.image} alt="" />
      {/await}
    </div>
  </div>
{/if}

<style type="scss">
  .lightbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0 0 0 / 90%);
    cursor: pointer;

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $colorWhite;

      :global.loading-indicator-wrapper {
        background-color: #000000;
      }
    }

    &__image {
      max-width: 90vw;
      max-height: 80vh;
      border: solid 0.5rem $colorWhite;
    }
  }
</style>
