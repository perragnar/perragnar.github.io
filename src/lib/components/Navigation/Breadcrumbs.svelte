<script>
  // Props.
  export let path = null;
  export let border = true;
</script>

{#if path}
  <ul class="breadcrumbs" class:breadcrumbs--border={border}>
    {#each path as item, index}
      <li>
        {#if item.route}
          <a href={item.route} class="breadcrumbs__link">
            {#if index > 0}
              <span aria-hidden="true">&rsaquo;</span>
            {/if}
            {item.text}
          </a>
        {:else}
          <div class="breadcrumbs__slot">
            {#if index > 0}
              <span aria-hidden="true">&rsaquo;</span>
            {/if}
            {item.text}
          </div>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style type="scss">
  .breadcrumbs {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    overflow: hidden;

    li {
      display: flex;
      align-items: center;
      flex-shrink: 1;

      .breadcrumbs__link,
      .breadcrumbs__slot {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        flex: 1;
        white-space: nowrap;

        span {
          position: absolute;
          left: 0.5rem;
          display: inline-block;
          line-height: 1;
          font-size: 1.5em;
          color: $colorLightGray;
          transform: translateX(-50%);
        }
      }

      &:not(:first-child) {
        .breadcrumbs__link,
        .breadcrumbs__slot {
          padding-left: 1.5rem;
        }
      }
    }

    &--border {
      border: solid 2px $colorBorder;
      border-radius: 3px;
    }
  }
</style>
