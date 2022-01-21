<script context="module">
  export const prerender = true;
</script>

<script>
  import { getRandomArrayPosts } from '$lib/functions/helperFunctions';

  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';
  import LatestBlogPosts from '$lib/components/BlogPostList/LatestBlogPosts.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';
  import { galleryStore } from '$lib/stores/galleryStore';

  // Route source.
  routeStore.setRoute('/');

  // Getting all gallery images.
  let heroImages = [];
  $galleryStore.forEach((category) => {
    category.images.forEach((image) => {
      heroImages.push(`/images/galleries/${category.slug}/${image.files.medium}`);
    });
  });

  // Gets a limited range of random hero images.
  heroImages = getRandomArrayPosts(heroImages, 5);
</script>

<svelte:head>
  <title>Hem</title>
</svelte:head>

<Hero images={heroImages} faded={true} mode="carousel" />

<SectionContent>
  <h1>Välkommen!</h1>
  <p class="intro">
    Per Ragnar Edin heter jag och är hobbyfotograf sedan några år tillbaka. Det här är min sida som handlar mestadels om
    fotografering och bilder.
  </p>
  <p>
    Bilderna ovan är hämtade från mitt <a href="/photo">fotogalleri</a>.
  </p>
  <p>
    Jag har en <a href="/blog">blogg</a> där jag ibland skriver några rader om fotografering, bilder, fotoutflykter och annat,
    men framför ett ställe där jag lägger upp bilder. Här är det senaste från bloggen.
  </p>
  <LatestBlogPosts postCount={1} appendPostCount={3} />
</SectionContent>
