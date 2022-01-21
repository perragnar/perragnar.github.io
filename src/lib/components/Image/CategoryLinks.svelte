<script>
  // Components.
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  // Stores.
  import { galleryStore } from '$lib/stores/galleryStore';

  // Props.
  export let currentCategory = null;

  // Other categories.
  let categories = $galleryStore.filter((category) => {
    return category.slug !== currentCategory.slug;
  });
</script>

<SectionHeader>Kategorier</SectionHeader>
<p>
  {#if categories.length > 1}
    Ta gärna en titt på bilderna i mina andra kategorier
    {#each categories as category, index}
      <a href={`/photo/${category.slug}`}>{category.title}</a>
      {#if index + 2 < categories.length}
        ,
      {:else if index + 2 === categories.length}
        &
      {/if}
    {/each}.
  {:else}
    Ta gärna en titt på bilderna i min andra kategori <a
      href={`/photo/${categories[0].slug}`}>{categories[0].title}</a
    >.
  {/if}
</p>
