<script>
  // Props.
  export let url = null;
  export let cssClass = '';
  export let prefetch = false;

  const componentAttributes = {};

  // Adds CSS class.
  if (url && cssClass !== '') {
    componentAttributes['class'] = cssClass;
  }

  // Adds sveltekit prefetch attribute.
  if (url && prefetch) {
    componentAttributes['sveltekit:prefetch'] = '';
  }
</script>

{#if url}
  <a href={url} {...componentAttributes}>
    <slot />
  </a>
{:else if cssClass}
  <div {...componentAttributes}>
    <slot />
  </div>
{:else}
  <slot />
{/if}
