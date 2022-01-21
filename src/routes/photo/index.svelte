<script context="module">
  export const prerender = true;
</script>

<script>
  // Components.
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';
  import ConditionalAnchor from '$lib/components/ConditionalAnchor.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';
  import { galleryStore } from '$lib/stores/galleryStore';

  // Route source.
  routeStore.setRoute('/photo');
</script>

<svelte:head>
  <title>Foto</title>
</svelte:head>

<Hero images="/images/hero/camera-front-small.jpg" faded={true} />

<SectionContent>
  <h1>Foto</h1>
  <p class="intro">
    Att ta ett foto som får betraktaren av bilden att få en känsla och återkoppla den känslan är en stor belöning för
    mig som fotograf. Speciellt när betraktaren av bilden får samma känsla som jag hade när jag tog bilden.
  </p>
  <p>
    Jag fotograferar helst landskap och natur. För mig är det viktigt att kunna koppla av och då passar den typen av
    fotografering mest. Det kräver mer tålamod än snabba reaktioner och beslut och inte samma press som t ex bröllops-
    eller porträttfotografering.
  </p>
</SectionContent>

<SectionContent clampType="wide">
  <SectionHeader>Fotogalleri</SectionHeader>
  <div class="categories">
    {#each $galleryStore as category}
      <ConditionalAnchor url={`/photo/${category.slug}`}>
        <div
          class="category"
          style={`background-image: url(/images/galleries/${category.slug}/${category.coverIcon});`}
        >
          <h3 class="category__title">
            {category.title}
          </h3>
        </div>
      </ConditionalAnchor>
    {/each}
  </div>
</SectionContent>

<style type="scss">
  .categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    :global(a) {
      text-decoration: none;
    }

    .category {
      background-position: center;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      @supports (aspect-ratio: 1.5) {
        aspect-ratio: 1.5;
      }

      @supports not (aspect-ratio: 1.5) {
        min-height: 150px;
      }

      &__title {
        margin: 0;
        padding: 2rem;
        color: $colorWhite;
      }
    }
  }
</style>
