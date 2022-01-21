<script>
  import { onMount } from 'svelte';

  // Components.
  import Date from '$lib/components/Date.svelte';
  import ConditionalAnchor from '$lib/components/ConditionalAnchor.svelte';

  // Props.
  export let type = 'default';
  export let title = null;
  export let route = null;
  export let image = null;
  export let imageCover = false;
  export let timeStamp = null;

  // Card types are basically different style of cards with
  // a set ofpredefined css classes.
  const cardTypes = {
    default: {
      cssClasses: ['card'],
    },
    inline: {
      cssClasses: ['card', 'card--inline'],
    },
  };

  // Setting the card attributes.
  const componentAttributes = {
    class: cardTypes[type] ? cardTypes[type].cssClasses.join(' ') : cardTypes.default.cssClasses,
  };
</script>

<div {...componentAttributes}>
  <ConditionalAnchor url={route || null}>
    {#if image}
      <div class="card__image" class:card__image-cover={imageCover} style={`background-image: url(${image});`} />
    {/if}
    <div class="card__content-wrapper" class:card__content-wrapper--cover={imageCover}>
      {#if title}
        <div class="card__title">{title}</div>
      {/if}
      {#if timeStamp}
        <div class="card__time-stamp">
          <Date date={timeStamp} />
        </div>
      {/if}
      <div class="card__content">
        <slot />
      </div>
    </div>
  </ConditionalAnchor>
</div>

<style type="scss">
  :global.card {
    position: relative;
    background-color: rgba(0 0 0 / 20%);
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(0 0 0 / 100%), 0 70px 65px rgb(0 0 0 / 9%), 0 30px 30px rgb(0 0 0 / 7%),
      0 15px 15px rgb(0 0 0 / 6%), 0 10px 8px rgb(0 0 0 / 5%), 0 4px 4px rgb(0 0 0 / 4%), 0 2px 2px rgb(0 0 0 / 3%);
    background-color: rgba(0 0 0 / 95%);

    @supports ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
    }

    a {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
    }

    &--inline {
      display: inline-block;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: '';
      border-radius: inherit;
      box-shadow: inset 0 1px 1px rgb(255 255 255 / 5%);
    }

    &__image {
      height: 200px;
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      &-cover {
        height: 100%;
        min-height: 250px;
        z-index: -1;
      }
    }

    &__title {
      font-family: $fontPunch;
      font-size: 1.2em;
      font-weight: bold;
      color: $colorOffWhite;
    }

    &__time-stamp {
      font-size: 0.6em;
      text-transform: uppercase;
      font-family: $fontPunch;
      font-weight: bold;
      letter-spacing: 1px;
      color: #aab3ca;
      margin-bottom: 1em;
      line-height: 1;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    &__content-wrapper {
      padding: 1em;

      &--cover {
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0 0 0 / 50%);
        backdrop-filter: blur(20px);
      }
    }

    &__content {
      font-size: 1em;
      color: #aab3ca;

      img {
        width: 100%;
      }

      a {
        color: initial;
      }
    }
  }
</style>
