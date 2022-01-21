<script>
  // Props.
  export let open = false;
</script>

<svg width="50" height="40" class:open aria-hidden="true">
  <line id="top" x1="10" y1="15" x2="40" y2="15" />
  <line id="bottom" x1="10" y1="25" x2="40" y2="25" />
</svg>

<style type="scss">
  svg {
    transition: transform 200ms ease-in-out;

    line {
      stroke: #fff;
      stroke-width: 3;
      transition: transform 500ms ease-in-out;
    }

    &.open {
      #top {
        transform: translate(18px, -8px) rotate(45deg);
      }

      #bottom {
        transform: translate(-11px, 20px) rotate(-45deg);
      }
    }
  }
</style>
