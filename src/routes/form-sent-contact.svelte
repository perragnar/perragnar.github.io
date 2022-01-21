<script context="module">
  export const prerender = true;
</script>

<script>
  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('');
</script>

<svelte:head>
  <title>Tack!</title>
</svelte:head>

<SectionContent>
  <h2>Tack för ditt meddelande!</h2>
  <p>
    Om du lämnade din e-postadress i kontaktformuläret så återkommer jag med ett
    svar inom kort.
  </p>
</SectionContent>
