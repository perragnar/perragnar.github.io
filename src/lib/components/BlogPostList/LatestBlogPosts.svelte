<script>
  import { getLatestPosts } from '$lib/functions/blogPostFunctions';

  // Components.
  import BlogPostCardList from '$lib/components/BlogPostList/BlogPostCardList.svelte';
  import BlogPostList from '$lib/components/BlogPostList/BlogPostList.svelte';

  // Stores.
  import { blogPostsStore } from '$lib/stores/blogPostsStore';

  // Props.
  export let postCount = 1;
  export let appendPostCount = 0;

  // The posts to show, including appended posts.
  const posts = getLatestPosts($blogPostsStore, postCount + appendPostCount);

  // The primary posts.
  const postsPrimary = posts.slice(0, postCount);

  // The appended posts.
  const postsAppended = posts.slice(postCount, appendPostCount + 1);
</script>

<div class="posts">
  {#if postsPrimary && postsPrimary.length > 0}
    <div class="posts-list posts-list--primary">
      <BlogPostCardList blogPostList={postsPrimary} />
    </div>
  {/if}
  {#if postsAppended && postsAppended.length > 0}
    <div class="posts-list posts-list--appended">
      <BlogPostList blogPostList={postsAppended} />
    </div>
  {/if}
</div>

<style type="scss">
  .posts {
    display: flex;
    flex-direction: column;

    .posts-list:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
</style>
