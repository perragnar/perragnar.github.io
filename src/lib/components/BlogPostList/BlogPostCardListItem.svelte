<script>
  import { fly } from 'svelte/transition';

  // Components.
  import Date from '$lib/components/Date.svelte';
  import ConditionalAnchor from '$lib/components/ConditionalAnchor.svelte';

  // Props.
  export let postData = null;
  export let index = 0;
  export let refresh = null;
</script>

{#if postData}
  <ConditionalAnchor url={postData.route || null} cssClass="blog-post-card-list__item-wrapper" prefetch={true}>
    <div
      class="post"
      class:post--image={postData.metadata.thumbnail}
      class:post--placeholder={!postData.metadata.thumbnail}
      in:fly={{ x: -20, duration: 200, delay: 20 * index }}
      out:fly={{ x: 20, duration: 200 }}
      {refresh}
    >
      <h3 class="post__title">
        {postData.metadata.title || null}
      </h3>
      {#if postData.metadata.categories}
        <div class="post__categories">
          {#if Array.isArray(postData.metadata.categories)}
            {#each postData.metadata.categories as category}
              <div class="post__categories__category">{category}</div>
            {/each}
          {:else}
            <div class="post__categories__category">{postData.metadata.categories}</div>
          {/if}
        </div>
      {/if}
      {#if postData.metadata.date}
        <div class="post__timestamp" class:post__timestamp--full={!postData.metadata.categories}>
          <Date date={postData.metadata.date} genericStyle={true} />
        </div>
      {/if}
      {#if postData.metadata.thumbnail}
        <div class="post__fader" />
        <div
          class="post__image"
          style={`background-image: url(${
            postData.metadata.thumbnail && postData.metadata.thumbnail.indexOf('/') === -1
              ? `${postData.metadata.path}/images/${postData.metadata.thumbnail}`
              : postData.metadata.thumbnail
          });`}
        />
      {:else}
        <div class="post__image post__image--placeholder" />
      {/if}
    </div>
  </ConditionalAnchor>
{/if}

<style type="scss">
  .post {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    justify-content: space-between;
    border-radius: 3px;
    overflow: hidden;
    height: 100%;
    height: auto;
    background-color: $colorDarkGray;

    @supports (aspect-ratio: 1.5) {
      aspect-ratio: 1.5;
    }

    @supports not (aspect-ratio: 1.5) {
      min-height: 150px;
    }

    @media (min-width: 1024px) {
      font-size: 1em;
    }

    &--image {
      height: auto;
    }

    &__title {
      padding: 1rem;
      margin: 0;
      font-size: 1.1em;
      line-height: 1.1;
      color: $colorWhite;
      grid-column: 1 / 3;
      z-index: 2;
    }

    &__categories {
      margin: 0;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $colorWhite;
      transform: translateX(-100%);
      z-index: 2;
      transition: transform 200ms ease 200ms;

      &__category {
        display: flex;
        gap: 0.1rem;
        align-items: flex-start;
        line-height: 1.1;
        margin: 0;
        font-size: 0.8em;
        white-space: nowrap;
        color: $colorWhite;

        &::before {
          content: '@';
          display: inline-block;
          line-height: 1;
          color: $colorLightGrayLight;
          font-weight: bold;
          font-size: 0.9em;
        }
      }
    }

    &__timestamp {
      margin: 0;
      padding: 1rem;
      color: $colorWhite;
      text-align: right;
      transform: translateX(100%);
      z-index: 2;
      transition: transform 200ms ease 400ms;

      &--full {
        grid-column: 1 / 3;
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

      &::before,
      &::after {
        content: '';
        display: block;
        flex: 1;
        background: rgb(0, 0, 0);
      }

      &::before {
        background: linear-gradient(180deg, rgba(0 0 0 / 50%) 0%, rgba(0 0 0 / 0%) 4rem);
      }

      &::after {
        background: linear-gradient(180deg, rgba(0 0 0 / 0%) calc(100% - 4rem), rgba(0 0 0 / 50%) 100%);
        transform: translateY(100%);
        transition: transform 200ms ease;
      }
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transform: scale(1);
      transition: transform 1000ms ease, filter 1000ms ease;

      &--placeholder {
        background-image: url('/images/logotype-watermark.svg');
        background-size: 40%;
      }
    }

    @media (hover: none) {
      .post__categories,
      .post__timestamp {
        transform: translateX(0);
      }

      .post__fader {
        &::after {
          transform: translateY(0);
        }
      }

      .post__image {
        transform: scale(1.1);
      }
    }

    @media (hover: hover) {
      &:hover {
        .post__categories,
        .post__timestamp {
          transform: translateX(0);
        }

        .post__fader {
          &::after {
            transform: translateY(0);
          }
        }

        .post__image {
          transform: scale(1.05);
          filter: blur(5px);
        }

        :global.post__timestamp .date {
          color: $colorWhite;
        }
      }
    }
  }
</style>
