<script>
  import { fade } from 'svelte/transition';

  // Props.
  export let refresh = '';
</script>

{#key refresh}
  <div class="page-transition" transition:fade>
    <slot />
  </div>
{/key}
