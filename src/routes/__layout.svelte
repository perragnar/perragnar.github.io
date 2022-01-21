<script context="module">
  export const load = async ({ url }) => {
    return {
      props: {
        key: url.pathname,
      },
    };
  };
</script>

<script>
  // Components.
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import PageContent from '$lib/components/PageContent/PageContent.svelte';
  import PageFooter from '$lib/components/PageFooter/PageFooter.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';

  // Props.
  export let key;

  // Global SCSS.
  import '$src/scss/index.scss';
</script>

<PageHeader />
<PageTransition refresh={key}>
  <PageContent>
    <slot />
  </PageContent>
  <PageFooter />
</PageTransition>
