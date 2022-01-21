<script context="module">
  export const prerender = true;
</script>

<script>
  import { getYearsFromIndex, getYearPosts } from '$lib/functions/blogPostFunctions';

  // Components.
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import SectionContent from '$lib/components/SectionContent.svelte';
  import BlogPostCardList from '$lib/components/BlogPostList/BlogPostCardList.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';

  // Stores.
  import { page } from '$app/stores';
  import { blogPostsStore } from '$lib/stores/blogPostsStore';
  import { routeStore, blogYearStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('/blog');

  // Getting a list of years from the blog index.
  const years = getYearsFromIndex($blogPostsStore);

  // Getting a initial list of posts (for current year).
  let yearIndex = [];

  // Setting the lastest available year as current.
  if (years.length > 0) {
    blogYearStore.setYear(years[0]);
  }

  // Getting year from querystring.
  if ($page.url.searchParams.get('y')) {
    blogYearStore.setYear($page.url.searchParams.get('y'));
  }

  $: yearIndex = getYearPosts($blogPostsStore, $blogYearStore);
</script>

<svelte:head>
  <title>Blogg</title>
</svelte:head>

<Hero images={['/images/hero/blog.jpg', '/images/hero/blog-2.jpg']} faded={true} />

<SectionContent>
  <h1>Blogg</h1>
  <p class="intro">
    Här i bloggen kan du titta på foton jag har tagit och om du vill, läsa mer om mina tankar och åsikter om dem.
  </p>
  <p>
    Bloggen är inte tänkt som ett galleri med mina bästa foton, utan mer en kanal för tankar, idéer, inspiration och
    minnen.<br />
    Vem vet, jag kanske till och med lägger ut lite mer instruerande blogginlägg där jag visar hur jag tar en viss typ av
    bild eller redigerar en bild för att få en önskad effekt. Med lite tur kanske jag delar med mig av lite tips på fotoutflykter
    och speciella ställen.
  </p>
  <p>
    Om du vill veta mer om en bild, plats eller om du har något annat på hjärtat kan du alltid <a href="/contact"
      >skicka mig ett meddelande</a
    >
    så ska jag svara så gott jag kan.
  </p>
</SectionContent>

<SectionContent clampType="wide">
  <div class="blog-index">
    {#await $blogPostsStore then posts}
      {#if years.length > 1}
        <div class="blog-index__info">
          {#each years as year}
            <h3
              class="year-selector-item anchor"
              class:active={$blogYearStore == year}
              role="button"
              on:click={() => {
                blogYearStore.setYear(year);
              }}
            >
              {year}
            </h3>
          {/each}
        </div>
      {/if}
      <div class="blog-index__list">
        {#if yearIndex.length > 0}
          {#key $blogYearStore}
            <SectionHeader>
              {$blogYearStore}
            </SectionHeader>
            <BlogPostCardList blogPostList={yearIndex} />
          {/key}
        {:else}
          <h3>Hoppsan!</h3>
          <p>Bloggen innehåller inga publicerade inlägg.</p>
        {/if}
      </div>
    {/await}
  </div>
</SectionContent>

<style type="scss">
  .blog-index {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__info {
      display: flex;
      justify-content: center;

      .year-selector-item {
        padding: 0.5rem;
        margin: 0;
        transition: margin 80ms ease;

        &.active {
          margin: 0;
        }
      }
    }
  }
</style>
