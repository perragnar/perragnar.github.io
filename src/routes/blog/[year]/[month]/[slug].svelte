<script context="module">
  export const prerender = true;

  export const load = async ({ params }) => {
    // The slug to search for based on the requested route.
    let year = params.year;
    let month = params.month;
    let slug = params.slug;

    // The post static content path.
    const postStaticContentLocation = `/content/${year}/${month}/${slug}`;

    let post = {};

    try {
      post = await import(`../../_content/${year}/${month}/${slug}/index.md`);
    } catch (error) {}

    // Check post status:
    let postStatus = 'published';
    if (post.metadata && post.metadata.status) {
      postStatus = post.metadata.status;
    }

    // Return 404 if post has draft status.
    if (postStatus === 'draft') {
      return {
        status: 404,
        error: 'Post not found',
        postStaticContentLocation,
      };
    }

    // Post data.
    let postData = {};

    // Trying to get the blog post data file.
    try {
      postData = await import(`../../_content/${year}/${month}/${slug}/_post-data.json`);
    } catch (error) {}

    return {
      props: {
        post: post.default,
        metadata: post.metadata,
        postData: postData.default,
        postStaticContentLocation,
      },
    };
  };
</script>

<script>
  import slugify from 'slugify';
  import { getDate } from '$lib/functions/helperFunctions';

  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';
  import Gallery from '$lib/components/Image/Gallery.svelte';
  import Img from '$lib/components/Image/Img.svelte';
  import Date from '$lib/components/Date.svelte';
  import Lightbox from '$lib/components/Image/Lightbox.svelte';
  import BackButton from '$lib/components/BackButton.svelte';
  import Breadcrumbs from '$lib/components/Navigation/Breadcrumbs.svelte';

  // Props.
  export let post = null;
  export let metadata = null;
  export let postStaticContentLocation = null;
  export let postData = null;

  // Show gallery.
  let showGallery = metadata && metadata.showGallery !== undefined ? metadata.showGallery : true;

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('/blog');

  // Blog post date.
  const postDateYear = getDate(metadata.date, 'YYYY');

  // The breadcrumbs path.
  const path = [
    {
      text: 'Blogg',
      route: '/blog',
    },
    {
      text: postDateYear,
      route: `/blog?y=${postDateYear}`,
    },
    {
      text: metadata.title || 'Inlägg',
      route: null,
    },
  ];
</script>

<svelte:head>
  <title>{metadata && metadata.title !== undefined ? metadata.title : 'Blogginlägg'}</title>
</svelte:head>

{#if metadata}
  {#if metadata.heroContent}
    <Hero
      images={metadata.heroImage && metadata.heroImage.indexOf('/') === -1
        ? `${postStaticContentLocation}/images/${metadata.heroImage}`
        : metadata.heroImage}
      size={metadata.heroSize || null}
      faded={metadata.heroFaded !== undefined ? metadata.heroFaded : true}
      blur={metadata.heroBlur || false}
      semiTransparent={metadata.heroSemiTransparent || false}
    >
      {@html metadata.heroContent}
    </Hero>
  {:else if metadata.heroImage}
    <Hero
      images={metadata.heroImage && metadata.heroImage.indexOf('/') === -1
        ? `${postStaticContentLocation}/images/${metadata.heroImage}`
        : metadata.heroImage}
      size={metadata.heroSize || null}
      faded={metadata.heroFaded !== undefined ? metadata.heroFaded : true}
      blur={metadata.heroBlur || false}
      semiTransparent={metadata.heroSemiTransparent || false}
    />
  {/if}
{/if}

<SectionContent>
  {#if metadata}
    <header class="post-header">
      <h1 class="post-title">{metadata.title || ''}</h1>

      {#if metadata.date}
        <div class="post-timestamp">
          <Date date={metadata.date} dateFormat="D MMMM, YYYY" genericStyle={true} />
        </div>
      {/if}
    </header>
  {/if}

  <div class="post-content">
    <svelte:component this={post} {postData} />
  </div>
</SectionContent>

{#if metadata}
  <SectionContent clampType="centerHorizontal">
    <BackButton url={`/blog?y=${postDateYear}`} text="Tillbaka" />
  </SectionContent>
  {#if showGallery && postData && postData.images && postData.images.length > 0}
    <SectionContent clampType="wide">
      <Gallery maxColumns={postData.images.length} galleryLabel={`Galleri`}>
        {#each postData.images as image}
          <Img
            src={`${postStaticContentLocation}/images/${image.files.small}`}
            thumbnail={`${postStaticContentLocation}/images/${image.files.thumbnail}`}
            targetSrc={`${postStaticContentLocation}/images/${image.files.medium}`}
            imageData={image.exif}
            index={image.index}
          />
        {/each}
      </Gallery>
    </SectionContent>
  {/if}

  <SectionContent>
    <footer class="post-footer">
      {#if metadata.categories}
        <div class="post-categories">
          {#if Array.isArray(metadata.categories)}
            {#each metadata.categories as category}
              <a
                href="/blog/categories/{slugify(category, {
                  lower: true,
                })}"
                class="item">{category}</a
              >
            {/each}
          {:else}
            <a
              href="/blog/categories/{slugify(metadata.categories, {
                lower: true,
              })}"
              class="item">{metadata.categories}</a
            >
          {/if}
        </div>
      {/if}
      {#if metadata.tags}
        <div class="post-tags">
          {#if Array.isArray(metadata.tags)}
            {#each metadata.tags as tag}
              <a
                href="/blog/tags/{slugify(tag, {
                  lower: true,
                })}"
                class="item">{tag}</a
              >
            {/each}
          {:else}
            <a
              href="/blog/tags/{slugify(metadata.tags, {
                lower: true,
              })}"
              class="item">{metadata.tags}</a
            >
          {/if}
        </div>
      {/if}
      <div class="blog-breadcrumbs">
        <Breadcrumbs {path} border={false} />
      </div>
      <!-- <a
        href={`https://github.com/perragnar/perragnar-com/tree/main/src/routes/blog${metadata.path.replace(
          'content/',
          '_content/'
        )}/index.md`}
        target="_blank"
        class="edit-post-link">Redigera</a
      > -->
    </footer>
  </SectionContent>
{/if}

<Lightbox />

<style type="scss">
  .post-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    .post-title {
      margin: 0;
      grid-row: 1 / 3;
    }

    .post-timestamp {
      color: $colorLightGray;
    }
  }

  .post-footer {
    display: grid;
    grid-template-columns: 1fr;
    border: solid 2px $colorBorder;
    border-radius: 3px;

    .post-categories,
    .post-tags {
      display: inline-flex;
      flex-wrap: wrap;
      border-bottom: solid 1px $colorBorder;

      @media (max-width: 800px) {
        justify-content: center;
      }

      .item {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        color: inherit;
        padding: 0.5rem;
        flex: 0 1;

        &::before {
          display: inline-block;
          margin-right: 3px;
          color: $colorLightGray;
          font-weight: bold;
          line-height: 1;
        }
      }
    }

    .post-categories {
      .item {
        &::before {
          content: '@';
          font-size: 0.8em;
        }
      }
    }

    .post-tags {
      .item {
        &::before {
          content: '#';
        }
      }
    }

    @media (max-width: 768px) {
      :global.breadcrumbs {
        justify-content: center;
      }
    }
  }
</style>
