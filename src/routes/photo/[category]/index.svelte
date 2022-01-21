<script context="module">
  import { getGalleryCategory } from '$lib/stores/galleryStore';

  export const prerender = true;

  export const load = async ({ params }) => {
    // Getting the current gallery category.
    const category = getGalleryCategory(params.category) || null;

    if (category) {
      return {
        props: {
          category,
        },
      };
    }
  };
</script>

<script>
  // Components.
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';
  import Gallery from '$lib/components/Image/Gallery.svelte';
  import ContentContainer from '$lib/components/ContentContainer.svelte';
  import Img from '$lib/components/Image/Img.svelte';
  import CategoryLinks from '$lib/components/Image/CategoryLinks.svelte';
  import Breadcrumbs from '$lib/components/Navigation/Breadcrumbs.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Props.
  export let category;

  // Sort images alphabetically.
  if (category && category.images) {
    category.images.sort((a, b) => {
      var titleA = a.title.toLowerCase();
      var titleB = b.title.toLowerCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });
  }

  // Route source.
  routeStore.setRoute('/photo');

  // The breadcrumbs path.
  const path = [
    {
      text: 'Foto',
      route: '/photo',
    },
    {
      text: category.title || 'Kategori',
      route: null,
    },
  ];
</script>

<svelte:head>
  <title>Foto</title>
</svelte:head>

{#if category && category.coverImage}
  <Hero images={`/images/galleries/${category.slug}/${category.coverImage}`} faded={true} />
{/if}

{#if !category}
  <SectionContent>
    <h1>Galleri</h1>
    <p>Tyvärr innehåller inte galleriet några bilder för tillfället.</p>
  </SectionContent>
{:else}
  <SectionContent>
    <h1>{(category && category.title) || 'Galleri'}</h1>

    {#if category.description}
      <p class="intro">
        {@html category.description}
      </p>
    {/if}

    {#if category.content}
      {@html category.content}
    {/if}
  </SectionContent>

  <SectionContent>
    <Breadcrumbs {path} />
  </SectionContent>

  <SectionContent clampType="wide">
    <Gallery galleryLabel={`Galleri`} galleryType="grid" maxColumns={category.images.length}>
      {#each category.images as image, index}
        <ContentContainer title={image.title || `Bild #${index + 1}`} link={`/photo/${category.slug}/${image.slug}`}>
          <Img
            thumbnail={`/images/galleries/${category.slug}/${image.files.thumbnail}`}
            src={`/images/galleries/${category.slug}/${image.files.small}`}
            link={`/photo/${category.slug}/${image.slug}`}
            index={index + 1}
            alt={image.title || `Ett fotografi i kategorin ${category.title}.`}
          />
        </ContentContainer>
      {/each}
    </Gallery>
  </SectionContent>

  <SectionContent>
    <CategoryLinks currentCategory={category} />
  </SectionContent>
{/if}
