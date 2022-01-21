<script>
  // Props.
  export let clampType = 'regular';

  // The different clamp classes.
  const clampTypes = {
    regular: ['clamp--regular', 'clamp--padding'],
    narrow: ['clamp--narrow', 'clamp--padding'],
    wide: ['clamp--wide', 'clamp--padding'],
    fullWidth: ['clamp--full-width', 'clamp--padding'],
    center: [
      'clamp--full-width',
      'clamp--full-height',
      'clamp--center-vertical',
      'clamp--center-horizontal',
      'clamp--center-text',
      'clamp--padding',
    ],
    centerVertical: [
      'clamp--full-height',
      'clamp--center-vertical',
      'clamp--padding',
    ],
    centerHorizontal: [
      'clamp--full-width',
      'clamp--center-horizontal',
      'clamp--center-text',
      'clamp--padding',
    ],
    centerHorizontalNoPadding: [
      'clamp--full-width',
      'clamp--center-horizontal',
      'clamp--center-text',
    ],
    smallPadding: ['clamp--small-padding'],
    noPadding: ['clamp--no-padding'],
  };

  // Specific clamp types.
  clampTypes['hero'] = [
    'clamp--wide',
    'clamp--full-height',
    'clamp--center-vertical',
    'clamp--center-horizontal',
    'clamp--center-text',
  ];
  clampTypes['pageHeader'] = ['clamp--regular'];

  // Getting a string of classes for the given type.
  // Fallback to regular.
  const clampClasses = clampTypes[clampType]
    ? clampTypes[clampType].join(' ')
    : clampTypes.regular.join(' ');
</script>

<div class={`clamp ${clampClasses}`}>
  <slot />
</div>

<style type="scss">
  .clamp {
    width: 100%;
    margin: 0 auto;
    transition: max-width 200ms ease;

    &--padding {
      padding: 2rem;

      @media (max-width: 600px) {
        padding: 1rem;
      }
    }

    &--small-padding {
      padding: 1rem;
    }

    &--no-padding {
      padding: 0;
    }

    &--regular {
      max-width: 800px;

      @media (max-width: 1000px) {
        max-width: 750px;
      }

      @media (max-width: 800px) {
        max-width: 600px;
      }
    }

    &--narrow {
      max-width: 600px;

      @media (max-width: 800px) {
        max-width: 500px;
      }

      @media (max-width: 600px) {
        max-width: 400px;
      }

      @media (max-width: 375px) {
        max-width: 300px;
      }
    }

    &--wide {
      max-width: 1400px;
    }

    &--full-width {
      max-width: 100%;
    }

    &--full-height {
      height: 100%;
    }

    &--center-horizontal {
      display: flex;
      justify-content: center;
    }

    &--center-vertical {
      display: flex;
      align-items: center;
    }

    &--center-text {
      text-align: center;
    }
  }
</style>
