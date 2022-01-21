<div class="loading-indicator-wrapper">
  <div class="loading-indicator">
    <div />
    <div />
    <div />
  </div>
</div>

<style type="scss">
  .loading-indicator-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .loading-indicator {
    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    width: 100px;
    height: 80px;
  }

  .loading-indicator div {
    display: inline-block;
    width: 20%;
    background: #fff;
    animation: loading-indicator 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .loading-indicator div:nth-child(1) {
    animation-delay: -0.24s;
  }

  .loading-indicator div:nth-child(2) {
    animation-delay: -0.12s;
  }

  .loading-indicator div:nth-child(3) {
    animation-delay: 0;
  }

  @keyframes loading-indicator {
    0% {
      height: 80%;
    }
    50%,
    100% {
      height: 20%;
    }
  }
</style>
