<script>
  import { fade } from 'svelte/transition';
  import { writable } from 'svelte/store';

  const NDFCData = writable({
    fStop: 3,
    exposureTime: 1,
    calculatedTime: null,
  });

  const NDFilterInfo = [
    {
      stops: 0,
      labels: ['No filter'],
    },
    {
      stops: 1,
      labels: ['ND2', 'ND 101', 'ND 0.3'],
    },
    {
      stops: 2,
      labels: ['ND4', 'ND 102', 'ND 0.6'],
    },
    {
      stops: 3,
      labels: ['ND8', 'ND 103', 'ND 0.9'],
    },
    {
      stops: 4,
      labels: ['ND16', 'ND 104', 'ND 1.2'],
    },
    {
      stops: 5,
      labels: ['ND32', 'ND 105', 'ND 1.5'],
    },
    {
      stops: 6,
      labels: ['ND64', 'ND 106', 'ND 1.8'],
    },
    {
      stops: 7,
      labels: ['ND128', 'ND 107', 'ND 2.1'],
    },
    {
      stops: 8,
      labels: ['ND256', 'ND 108', 'ND 2.4'],
    },
    {
      stops: 9,
      labels: ['ND512', 'ND 109', 'ND 2.7'],
    },
    {
      stops: 10,
      labels: ['ND1000 (1024)', 'ND 110', 'ND 3.0'],
    },
    {
      stops: 15,
      labels: ['ND32000', 'ND 115', 'ND 4.5'],
    },
    {
      stops: 20,
      labels: ['ND100K', 'ND 120', 'ND 6.0'],
    },
  ];

  const opticalDensityFactor = 0.3;

  // This controls which f-stops to select from.
  const fStopLimit = { min: 0, max: 15 };
  let filterOptions = [];
  for (let i = fStopLimit.min; i <= fStopLimit.max; i++) {
    const filter = NDFilterInfo.filter((item) => {
      return item.stops === i;
    });

    filterOptions.push({
      label: `${i > 0 ? `${i} steg - ` : ''} ${filter[0] ? `${filter[0].labels.join(' / ')}` : ''}`,
      value: i,
    });
  }

  // This controls which exposure time limits to select from.
  // This is only the max value in seconds added to the hard coded initial time fraction values.
  const exposureTimeLimit = 30;
  let exposureTimeOptions = [
    { label: '1/1000', value: 1 / 1000 },
    { label: '1/500', value: 1 / 500 },
    { label: '1/250', value: 1 / 250 },
    { label: '1/125', value: 1 / 125 },
    { label: '1/60', value: 1 / 60 },
    { label: '1/30', value: 1 / 30 },
    { label: '1/15', value: 1 / 15 },
    { label: '1/8', value: 1 / 8 },
    { label: '1/4', value: 1 / 4 },
    { label: '1/2', value: 1 / 2 },
    { label: '1', value: 1 },
  ];
  for (let i = 2; i <= exposureTimeLimit; i++) {
    exposureTimeOptions.push({ label: i, value: i });
  }

  /**
   * When getting shutter speed under 1 sec,
   * get the closest match to any of the predefined shutter speeds.
   */
  const getFastShutterSpeed = (time) => {
    return [1000, 500, 250, 125, 60, 30, 15, 8, 4, 2].reduce((a, b) => {
      return Math.abs(b - time) < Math.abs(a - time) ? b : a;
    });
  };

  /**
   * Converts n seconds to a readabe time in minutes and seconds.
   */
  const secondsToReadableTime = (time) => {
    const hours = Math.floor(time / 3600).toString();
    const minutes = Math.floor((time - hours * 3600) / 60).toFixed(0).toString();
    const seconds = (time - hours * 3600 - minutes * 60).toFixed(0).toString();

    if (time < 1) {
      return `<span class="digit">1</span>/<span class="digit">${getFastShutterSpeed(1 / time)}</span>"`;
    } else if (time < 60) {
      return `<span class="digit">${time.toFixed()}</span>"`;
    } else if (time < 3600) {
      return `<span class="digit">${minutes}</span>'<span class="digit">${seconds}</span>"`;
    } else {
      return `<span class="digit">${hours}</span>h<span class="digit">${minutes}</span>'<span class="digit">${seconds}</span>"`;
    }
  };

  /**
   * Calculates the shutterspeed with the formula
   * base shutterspeed times the square of the f-stop value.
   */
  const calculateTime = (options) => {
    $NDFCData.calculatedTime = options.exposureTime * Math.pow(2, options.fStop);
  };

  $: calculateTime($NDFCData);
</script>

<div class="ndfc">
  <header class="ndfc__header">
    <h2 class="ndfc__header__title">ND-filterkalkylator</h2>
  </header>
  <section class="ndfc__options">
    <div class="ndfc__options__option" style:flex="1">
      {#if filterOptions.length}
        <h3>ND-filter</h3>
        <select id="filter" name="filter" class="dropdown" bind:value={$NDFCData.fStop}>
          {#each filterOptions as filterOption}
            <option value={filterOption.value}>{filterOption.label}</option>
          {/each}
        </select>
      {:else}
        <p>Inga filter tillgängliga</p>
      {/if}
    </div>
    <div class="ndfc__options__option" style:flex="1">
      {#if exposureTimeOptions.length}
        <h3>Slutartid</h3>
        <select id="exposure-time" name="exposure-time" class="dropdown" bind:value={$NDFCData.exposureTime}>
          {#each exposureTimeOptions as exposureTimeOption}
            <option value={exposureTimeOption.value}>{exposureTimeOption.label} s</option>
          {/each}
        </select>
      {:else}
        <p>Inga slutartider valbara.</p>
      {/if}
    </div>
  </section>
  {#if $NDFCData.calculatedTime}
    <section class="ndfc__result" transition:fade>
      {@html secondsToReadableTime($NDFCData.calculatedTime)}
    </section>
  {/if}
</div>

<style type="scss">
  .ndfc {
    border: solid 2px $colorBorder;
    border-radius: 3px;
    display: flex;
    flex-direction: column;

    &__header {
      border-bottom: solid 1px $colorBorder;
      padding: 1rem;

      &__title {
        line-height: 1;
        margin: 0;
      }
    }

    &__options {
      border-bottom: solid 1px $colorBorder;
      display: flex;

      &__option {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:first-child {
          border-right: solid 1px $colorBorder;
        }

        h3 {
          font-size: 1.2em;

          @media (max-width: 768px) {
            font-size: 1em;
          }
        }

        .dropdown {
          width: 100%;
          padding: 1rem;
          line-height: 1;
          border-radius: 3px;
          border: none;
          background-color: $colorBorder;
          color: inherit;
          font-size: 1.2em;

          @media (max-width: 768px) {
            font-size: 1em;
          }
        }
      }
    }

    &__result {
      padding: 2rem;
      color: $colorLightGray;
      background-color: $colorBorder;
      font-size: 5em;
      font-weight: bold;
      display: flex;
      justify-content: center;
      line-height: 1;

      @media (max-width: 768px) {
        font-size: 3em;
      }

      :global(span) {
        color: $colorWhite;
      }
    }
  }
</style>
