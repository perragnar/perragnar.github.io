<script>
  // Components.
  import Clamp from '$lib/components/Clamp.svelte';

  // Props.
  export let clampType = 'regular';
</script>

<div class="section-content">
  <Clamp {clampType}>
    <slot />
  </Clamp>
</div>

<style type="scss">
  :global.page-content {
    & > .section-content:first-child {
      padding-top: 10rem;

      @media (max-width: 768px) {
        padding-top: 5rem;
      }
    }
  }
</style>
