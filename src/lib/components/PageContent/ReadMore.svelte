<script>
  // Props.
  export let buttonLabel = 'Läs mer';

  let expanded = false;
</script>

<div class="read-more">
  <div
    class="read-more__expander"
    class:read-more__expander--expanded={expanded}
  >
    <slot />
  </div>
  {#if !expanded}
    <button
      class="button button--basic read-more__button"
      on:click={() => (expanded = true)}>{buttonLabel}</button
    >
  {/if}
</div>

<style type="scss">
  .read-more {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__expander {
      position: relative;
      max-height: 150px;
      overflow: hidden;
      box-shadow: inset 0 -3rem 3rem -3rem rgba(0 0 0 / 30%);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      padding: 2rem;
      margin-left: -2rem;
      margin-right: -2rem;
      border-bottom: solid 2px rgba(255 255 255 / 5%);
      transition: padding 200ms ease, margin 200ms ease;

      &--expanded {
        max-height: 100%;
        box-shadow: none;
        margin-left: 0;
        margin-right: 0;
        padding: 0;
        border-bottom: none;
        overflow: visible;
      }
    }

    &__button {
      margin-top: 2rem;
    }
  }
</style>
