<script>
  // Components.
  import BlogPostCardListItem from '$lib/components/BlogPostList/BlogPostCardListItem.svelte';

  // Props.
  export let blogPostList = null;
  export let refresh = null;
  export let highlightLatest = false;
</script>

{#if blogPostList}
  <div
    class={`posts-list posts-list--${blogPostList.length < 3 ? blogPostList.length : 3}`}
    class:posts-list--highlight-latest={highlightLatest}
  >
    {#each blogPostList as postData, index}
      <BlogPostCardListItem {postData} {index} {refresh} />
    {/each}
  </div>
{/if}

<style type="scss">
  .posts-list {
    display: grid;
    gap: 2rem;

    @media (max-width: 600px) {
      gap: 1rem;
    }

    &--1 {
      grid-template-columns: 1fr;
    }

    &--2 {
      grid-template-columns: repeat(2, 1fr);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    &--3 {
      grid-template-columns: repeat(3, 1fr);

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }

  .posts-list--highlight-latest {
    :global.blog-post-list__item-wrapper {
      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }

      &:first-child {
        grid-column: 1 / 4;

        @media (max-width: 1024px) {
          grid-column: 1 / 3;
        }

        @media (max-width: 768px) {
          grid-column: initial;
        }

        .post--image {
          @supports (aspect-ratio: 2.5) {
            aspect-ratio: 2.5;
          }

          @supports not (aspect-ratio: 2.5) {
            min-height: 150px;
          }
        }
      }

      .post {
        &__timestamp,
        &__description {
          color: #c1cfd9;
        }
      }
    }
  }
</style>
