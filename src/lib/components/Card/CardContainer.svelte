<script>
  // Props.
  export let columns = 1;
  export let featured = false;

  // Card container attributes.
  const componentAttributes = {
    class: ['card-container'],
  };

  // Setting container columns.
  if (columns > 1) {
    componentAttributes.class.push(`card-container--${columns}`);
  }

  // Featured card container.
  if (featured === true) {
    componentAttributes.class.push('card-container--featured');
  }

  componentAttributes.class = componentAttributes.class.join(' ');
</script>

<div {...componentAttributes}>
  <slot />
</div>

<style type="scss">
  :global.card-container {
    $cardGap: 20px;

    display: grid;
    gap: 1em;

    &--featured {
      .card:first-child {
        @media (min-width: 601px) {
          grid-area: 1 / 1 / 1 / 3;
        }

        @media (min-width: 801px) {
          grid-area: 1 / 1 / 3 / 3;
        }
      }
    }

    @for $i from 1 through 10 {
      &--#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
</style>
