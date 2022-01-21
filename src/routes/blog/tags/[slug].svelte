<script context="module">
  export const prerender = true;

  export const load = async ({ params }) => {
    // The slug to search for based on the requested route.
    return {
      props: {
        slug: params.slug,
      },
    };
  };
</script>

<script>
  import { getAllPosts } from '$lib/functions/blogPostFunctions';
  import slugify from 'slugify';

  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import BlogPostList from '$lib/components/BlogPostList/BlogPostList.svelte';

  // Props.
  export let slug;

  // Stores.
  import { blogPostsStore } from '$lib/stores/blogPostsStore';
  import { routeStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('/blog');

  const allPosts = getAllPosts($blogPostsStore);
  let posts = [];

  // An array of blog posts having the requested categories.
  posts = allPosts.filter((post) => {
    const postTags = post.metadata.tags;
    const tags = [];
    let postStatus = 'published';

    if (post.metadata && post.metadata.status) {
      postStatus = post.metadata.status;
    }

    if (postStatus === 'published' && postTags) {
      if (Array.isArray(postTags)) {
        postTags.forEach((tag) => {
          tags.push(
            slugify(tag, {
              lower: true,
            })
          );
        });
      } else {
        tags.push(
          slugify(postTags, {
            lower: true,
          })
        );
      }
    }

    return tags.includes(slug);
  });
</script>

<svelte:head>
  <title>Blogg</title>
</svelte:head>

<SectionContent>
  <h1>Blogginlägg - Tagg</h1>
  {#if posts.length === 0}
    <p>Inga blogginlägg matchar taggen.</p>
  {:else}
    <BlogPostList blogPostList={posts} />
  {/if}
</SectionContent>
