<script>
  // Components.
  import ListItem from '$lib/components/BlogPostList/BlogPostListItem.svelte';

  // Props.
  export let blogPostList = null;
  export let refresh = null;
</script>

{#if blogPostList}
  <div class="posts-list">
    {#each blogPostList as postData, index}
      <ListItem {postData} {index} {refresh} />
    {/each}
  </div>
{/if}

<style type="scss">
  .posts-list {
    border: solid 2px $colorBorder;
    border-radius: 3px;

    @media (max-width: 768px) {
      border-width: 1px;
    }
  }
</style>
