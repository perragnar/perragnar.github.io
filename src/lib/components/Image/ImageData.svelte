<script>
  // Props.
  export let imageData = null;
  export let showIcons = true;
  export let index = null;

  // Showing effective focal length equivalent to a 35mm full frame sensor camera.
  let focalLengthInfo = null;
  if (imageData) {
    // Rounding focal length data.
    if (imageData.focalLength) {
      imageData.focalLength = Math.floor(imageData.focalLength);
    }
    if (imageData.focalLengthEq) {
      imageData.focalLengthEq = Math.floor(imageData.focalLengthEq);
    }

    if (imageData.focalLength && imageData.focalLengthEq) {
      // Both focalLength and focalLengthEq exists. If they are different, show both values in the focal length info.
      focalLengthInfo =
        imageData.focalLength === imageData.focalLengthEq
          ? `${imageData.focalLength} mm`
          : `${imageData.focalLength} mm (${imageData.focalLengthEq} mm)`;
    } else if (imageData.focalLength && !imageData.focalLengthEq) {
      focalLengthInfo = `${imageData.focalLength} mm`;
    } else if (!imageData.focalLength && imageData.focalLengthEq) {
      focalLengthInfo = `${imageData.focalLengthEq} mm`;
    }
  }

  const imageDataTitle = null;
</script>

<div class="image-data">
  {#if index}
    <div class="image-data__index">{index}</div>
  {/if}
  {#if imageDataTitle}
    <div class="image-data__title">{imageDataTitle}</div>
  {/if}
  <div class="image-data__sections">
    {#if focalLengthInfo}
      <div class="image-data__sections__section">
        {#if showIcons}
          <img src="/images/icon-focallength.svg" alt="Focal length" class="image-data__sections__section__icon" />
        {/if}
        {focalLengthInfo}
      </div>
    {/if}
    {#if imageData.aperture}
      <div class="image-data__sections__section">
        {#if showIcons}
          <img src="/images/icon-aperture.svg" alt="Aperture" class="image-data__sections__section__icon" />
        {/if}
        {imageData.aperture}
      </div>
    {/if}
    {#if imageData.exposureTime}
      <div class="image-data__sections__section">
        {#if showIcons}
          <img src="/images/icon-exposure-time.svg" alt="Exposure time" class="image-data__sections__section__icon" />
        {/if}
        {imageData.exposureTime}
      </div>
    {/if}
    {#if imageData.iso}
      <div class="image-data__sections__section">
        {#if showIcons}
          <img src="/images/icon-iso.svg" alt="ISO" class="image-data__sections__section__icon" />
        {:else}
          ISO
        {/if}
        {imageData.iso}
      </div>
    {/if}
    {#if imageData.description}
      <div class="image-data__sections__section">
        {imageData.description}
      </div>
    {/if}
  </div>
</div>

<style type="scss">
  .image-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center;
    padding: 0 2em;

    &__index {
      color: $colorDarkGray;
      font-size: 0.7em;
      font-weight: bold;
      display: block;
      line-height: 1;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 3px;
      margin: 3px;
      border-radius: 3px;

      &:before {
        content: '#';
        color: $colorLightGray;
      }
    }

    &__title {
      position: relative;
      font-size: 0.7em;
      text-transform: uppercase;
      font-family: $fontPunch;
      font-weight: bold;
      color: $colorDarkGray;
      align-self: center;
      white-space: nowrap;

      @media (max-width: 768px) {
        font-size: 0.6em;
      }
    }

    &__sections {
      width: clamp(120px, 100%, 200px);
      display: flex;
      flex-direction: column;
      font-size: 0.8em;
      border: solid 2px $colorBorder;
      border-radius: 3px;

      @media (max-width: 768px) {
        border-width: 1px;
        font-size: 0.7em;
        margin-bottom: 0;
      }

      @media (max-width: 500px) {
        font-size: 0.8em;
      }

      &__section {
        flex: 1 1;
        padding: 0.3em 0.5em;
        white-space: nowrap;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $colorDarkGray;

        @media (max-width: 768px) {
          padding: 0.1em 0.5em;
        }

        @media (max-width: 500px) {
          padding: 0.2em 0.5em;
        }

        &:not(:last-child) {
          border-bottom: solid 1px $colorBorder;
        }

        &__icon {
          width: 1em;
          margin-right: 0.3em;
        }
      }
    }

    .image-data__title + .image-data__sections {
      margin-bottom: 1em;
    }
  }
</style>
