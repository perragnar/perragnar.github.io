<script>
  // Components.
  import ConditionalAnchor from '$lib/components/ConditionalAnchor.svelte';

  // Props.
  export let type = 'regular';
  export let title = null;
  export let description = null;
  export let link = null;

  // Container sizes.
  const containerSizes = ['wide', 'regular', 'narrow'];
  if (!containerSizes.includes(type)) {
    type = 'regular';
  }
</script>

<div class={`content-container content-container--${type}`}>
  {#if title}
    <div class="content-container__title">
      <ConditionalAnchor url={link}>
        {title}
      </ConditionalAnchor>
    </div>
  {/if}
  <div class={`content-container__content content-container__content--${type}`}>
    <slot />
  </div>
  {#if description}
    <div class="content-container__description">
      <ConditionalAnchor url={link}>
        {@html description}
      </ConditionalAnchor>
    </div>
  {/if}
</div>

<style type="scss">
  .content-container {
    margin: 1rem 0 3rem 0;

    &--narrow {
      .content-container__title,
      .content-container__description {
        text-align: center;
      }
    }

    &__content {
      perspective: 1200px;

      &--wide {
        margin: 0 -8rem;

        @media (max-width: 1024px) {
          margin: 0;
        }
      }

      &--narrow {
        margin: 0 auto;
        max-width: 60%;

        @media (max-width: 1024px) {
          margin: 0 auto;
          max-width: 80%;
        }
      }
    }

    &__title {
      padding: 1em;
      font-family: $fontPunch;
      font-weight: bold;
      color: $colorWhite;
      text-align: center;

      :global(a) {
        color: inherit;
      }
    }

    &__description {
      padding: 1em;
      color: $colorLightGrayLight;
      font-size: 0.8em;
      text-align: center;
    }
  }
</style>
