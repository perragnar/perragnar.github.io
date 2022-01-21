<script>
  // Props.
  export let q = 'all';

  // Current screen properties.
  let currentScreenWidth = 0;
  let currentScreenHeight = 0;
  let currentDeviceOrientation = null;

  // Query limits.
  const queryRules = {
    mobile: {
      min: 0,
      max: 768,
    },
    tablet: {
      min: 769,
      max: 1024,
    },
    desktop: {
      min: 1025,
      max: 10000,
    },
  };

  // Queries.
  const queries = {
    mobile: {
      size: {
        min: queryRules.mobile.min,
        max: queryRules.mobile.max,
      },
    },
    tablet: {
      size: {
        min: queryRules.tablet.min,
        max: queryRules.tablet.max,
      },
    },
    desktop: {
      size: {
        min: queryRules.desktop.min,
        max: queryRules.desktop.max,
      },
    },
    maxTablet: {
      size: {
        min: queryRules.mobile.min,
        max: queryRules.tablet.max,
      },
    },
    minTablet: {
      size: {
        min: queryRules.tablet.min,
        max: queryRules.desktop.max,
      },
    },
    all: {
      size: {
        min: queryRules.mobile.min,
        max: queryRules.desktop.max,
      },
    },
    landscape: {
      orientation: 'landscape',
    },
    portrait: {
      orientation: 'portrait',
    },
  };

  // The selected query.
  const query = queries[q] || null;

  // Is query active?
  let queryIsActive = false;

  /**
   * This functions checks if passed query is active based on the query rules.
   * Currently supports max/min width and orientation.
   *
   * @param query
   * @returns boolean
   */
  const checkIfQueryIsActive = (query, currentDeviceOrientation) => {
    if (!query || !currentDeviceOrientation) {
      return false;
    }

    if (query.size) {
      return currentScreenWidth >= query.size.min && currentScreenWidth <= query.size.max;
    } else if (query.orientation) {
      return currentDeviceOrientation === query.orientation || false;
    }
  };

  $: currentDeviceOrientation = currentScreenWidth > currentScreenHeight ? 'landscape' : 'portrait';
  $: queryIsActive = checkIfQueryIsActive(query, currentDeviceOrientation);
</script>

<svelte:window bind:innerWidth={currentScreenWidth} bind:innerHeight={currentScreenHeight} />

{#if queryIsActive}
  <slot />
{/if}
