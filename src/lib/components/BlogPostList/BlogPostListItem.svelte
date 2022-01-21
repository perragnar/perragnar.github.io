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
  <div class="post" in:fly={{ x: -20, duration: 200, delay: 20 * index }} out:fly={{ x: 20, duration: 200 }} {refresh}>
    <ConditionalAnchor url={postData.route || null} cssClass="blog-post-list__item-wrapper" prefetch={true}>
      <h3 class="post__title">
        {postData.metadata.title || null}
      </h3>
      <div class="post__meta">
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
          <div class="post__timestamp">
            <Date date={postData.metadata.date} genericStyle={true} />
          </div>
        {/if}
      </div>
    </ConditionalAnchor>
  </div>
{/if}

<style type="scss">
  :global.blog-post-list__item-wrapper {
    padding: 0.5rem;
    display: grid !important;
    gap: 0.5rem;
    grid-template-columns: 1fr auto;
    align-items: center;

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }

    .post {
      &__timestamp {
        color: #c1cfd9;
      }
    }
  }

  .post {
    &:not(:last-child) {
      border-bottom: solid 1px $colorBorder;
    }

    &__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    &__title {
      margin: 0;
      font-size: 1em;
      line-height: 1.1;
    }

    &__categories {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &__category {
        display: flex;
        gap: 0.1rem;
        align-items: center;
        line-height: 1.1;
        margin: 0;
        font-size: 0.8em;
        white-space: nowrap;
        color: $colorLightGrayLight;

        &::before {
          content: '@';
          display: inline-block;
          line-height: 1;
          color: $colorLightGray;
          font-weight: bold;
          font-size: 0.9em;
        }
      }
    }

    &__timestamp {
      margin: 0;
    }
  }
</style>
