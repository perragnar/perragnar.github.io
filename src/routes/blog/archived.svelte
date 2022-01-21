<script context="module">
  export const prerender = true;

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('/blog');
</script>

<script>
  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';
</script>

<svelte:head>
  <title>Blogg</title>
</svelte:head>

<Hero images="/images/hero/archive.jpg" size="half" faded={true} />

<SectionContent>
  <h1>Blogginlägget är arkiverat :(</h1>
  <p>Många av de gamla blogginläggen är dessvärre arkiverade.</p>
  <ul>
    <li><a href="/">Startsidan</a></li>
    <li><a href="/blog">Bloggen</a></li>
    <li><a href="/contact">Kontakta mig</a></li>
  </ul>
</SectionContent>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
