<div class="section-header">
  <h2 class="section-header__content">
    <slot />
  </h2>
</div>

<style type="scss">
  .section-header {
    margin: 2rem 0;
    display: flex;
    align-items: center;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 2px;
      transform: translateY(-3px);
      background-color: $colorBorder;
      flex: 1;
    }

    &__content {
      font-size: 0.7em;
      text-transform: uppercase;
      font-family: $fontPunch;
      letter-spacing: 1px;
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 100px;
      border: solid 2px $colorBorder;
    }
  }
</style>
