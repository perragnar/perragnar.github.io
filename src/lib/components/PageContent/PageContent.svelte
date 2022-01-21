<main class="page-content" aria-label="Sidinnehåll">
  <slot />
</main>

<style type="scss">
  .page-content {
    position: relative;
    background-color: $colorDarkGrayLight;
    color: #c1cfd9;
    padding-bottom: clamp(5rem, 10vw, 10rem);

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5vw;
    }

    &::before {
      background-color: $colorBodyBackground;
    }

    &::after {
      background-color: $colorDarkGrayLight;
      clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 5vw), 0% 100%);
    }

    :global.intro {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
</style>
