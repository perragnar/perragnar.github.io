<script>
  import { getDate } from '$lib/functions/helperFunctions';

  // Props.
  export let date = null;
  export let dateFormat = 'D MMM, YYYY';
  export let genericStyle = false;
</script>

{#if date}
  <div class="date" class:generic={genericStyle}>
    {getDate(date, dateFormat)}
  </div>
{/if}

<style type="scss">
  .generic {
    font-size: 0.7em;
    line-height: 1;
    text-transform: uppercase;
    font-family: $fontPunch;
    letter-spacing: 1px;
    font-weight: bold;
    white-space: nowrap;
  }
</style>
