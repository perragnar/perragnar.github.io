<script>
  // Props.
  export let url = null;
  export let text = '';
</script>

<a href={url} class="back-link"
  ><span aria-hidden="true">&lsaquo;</span>{@html text}</a
>

<style type="scss">
  .back-link {
    display: inline-flex;
    align-items: baseline;
    padding: 0.2rem 0.5rem;
    border: solid 1px $colorBorder;
    border-radius: 3px;

    @media (max-width: 768px) {
      justify-self: center;
    }

    & > span {
      display: inline-block;
      color: $colorLightGray;
      font-size: 1.2em;
      line-height: 1;
      overflow: hidden;
      text-align: left;
      transition: min-width 500ms ease;

      @media (hover: hover) {
        min-width: 0;
        max-width: 0;
      }

      @media (hover: none) {
        min-width: 1ch;
      }
    }

    @media (hover: hover) {
      &:hover {
        & > span {
          min-width: 1ch;
        }
      }
    }
  }
</style>
