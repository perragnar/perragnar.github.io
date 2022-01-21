<script context="module">
  import { getGalleryCategory } from '$lib/stores/galleryStore';

  export const prerender = true;

  export const load = async ({ params }) => {
    let slug = params.slug;

    // Getting the current gallery category.
    const category = getGalleryCategory(params.category) || [];

    // Getting the correct image from gallery.
    let image = category.images.filter((image) => {
      return image.slug === slug;
    });

    image = image[0] || null;

    if (category && image) {
      return {
        props: {
          category,
          image,
        },
      };
    }
  };
</script>

<script>
  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Lightbox from '$lib/components/Image/Lightbox.svelte';
  import ContentContainer from '$lib/components/ContentContainer.svelte';
  import Img from '$lib/components/Image/Img.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import CategoryLinks from '$lib/components/Image/CategoryLinks.svelte';
  import Breadcrumbs from '$lib/components/Navigation/Breadcrumbs.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Props.
  export let category = null;
  export let image = null;

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
      route: `/photo/${category.slug}`,
    },
    {
      text: image.title || 'Bild',
      route: null,
    },
  ];
</script>

<svelte:head>
  <title>{image.title || 'Foto'}</title>
</svelte:head>

<SectionContent>
  <h1>{image.title}</h1>

  {#if image && image.description}
    {@html image.description}
  {/if}
</SectionContent>

<SectionContent clampType="wide">
  <ContentContainer description="Klicka på bilden för en högupplöst version.">
    <Img
      thumbnail={`/images/galleries/${category.slug}/${image.files.thumbnail}`}
      src={`/images/galleries/${category.slug}/${image.files.medium}`}
      targetSrc={`/images/galleries/${category.slug}/${image.files.large}`}
      alt={image.title || `Ett fotografi i kategorin ${category.title}.`}
    />
  </ContentContainer>
</SectionContent>

<SectionContent>
  <Breadcrumbs {path} />
</SectionContent>

<SectionContent>
  <SectionHeader>Intresserad av att köpa en print?</SectionHeader>
  <p>
    Vill du hänga upp den här bilden på din vägg så kan du köpa en print. Jag använder <a href="https://crimson.se"
      >Crimson</a
    > och de har hög kvalitet på sina framkallningar till ett bra pris.
  </p>
  <p>
    <a href={`/contact?m=Hej! Jag är intresserad av att köpa bilden ${image.title}`}>Kontakta mig</a> om du är intresserad
    av att köpa en bild, antingen printad eller digital.
  </p>
  {#if image.printPreviews}
    <div class="print-preview">
      {#if image.printPreviews.includes('regular')}
        <ContentContainer>
          <Img
            thumbnail={`/images/galleries/${category.slug}/${image.files.thumbnail}`}
            src={`/images/galleries/${category.slug}/${image.files.medium}`}
            alt={image.title || `Ett fotografi i kategorin ${category.title}.`}
            frame="frame1"
          />
        </ContentContainer>
      {/if}
      {#if image.printPreviews.includes('monochrome')}
        <ContentContainer>
          <Img
            thumbnail={`/images/galleries/${category.slug}/${image.files.thumbnail}`}
            src={`/images/galleries/${category.slug}/${image.files.medium}`}
            alt={image.title || `Ett fotografi i kategorin ${category.title}.`}
            frame="frame1"
            monochrome={true}
          />
        </ContentContainer>
      {/if}
    </div>
  {/if}
</SectionContent>

<SectionContent>
  <CategoryLinks currentCategory={category} />
  <Breadcrumbs {path} />
</SectionContent>

<Lightbox />

<style type="scss">
  .print-preview {
    :global.content-container {
      margin: 0 1rem;

      &:not(:last-child) {
        margin-bottom: 5rem;

        @media (max-width: 768px) {
          margin-bottom: 3rem;
        }
      }
    }
  }
</style>
