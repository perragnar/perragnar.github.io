<script>
  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import NavigationList from '$lib/components/Navigation/NavigationList.svelte';
</script>

<footer class="page-footer">
  <SectionContent>
    <div class="page-footer__content">
      <nav class="page-footer__navigation" aria-label="Navigering i sidfot">
        <NavigationList />
      </nav>
      <div class="page-footer__social-media">
        <a href="https://www.instagram.com/perragnarfoto" target="_blank">
          <img src="/images/icons8-instagram.svg" alt="Länk till min Instagram-sida" />
        </a>
        <a href="https://www.facebook.com/perragnarfoto" target="_blank">
          <img src="/images/icons8-facebook.svg" alt="Länk till min Facebook-sida" />
        </a>
      </div>
      <div class="page-footer__info">
        <p>&copy; Alla foton och allt material tillhör Per Ragnar Edin om inget annat anges.</p>
      </div>
      <div class="page-footer__afiliates">
        <div class="page-footer__afiliates__external-logo">
          <div class="label">Hosted by</div>
          <a href="https://www.netlify.com" no-decoration>
            <img src="/images/netlify-logo.png" alt="Netlify" style="max-width: 70px;" />
          </a>
        </div>
        <div class="page-footer__afiliates__external-logo">
          <div class="label">Built with</div>
          <a href="https://kit.svelte.dev" no-decoration>
            <img src="/images/sveltekit-logo.png" alt="SvelteKit" style="max-width: 100px;" />
          </a>
        </div>
      </div>
      <div class="page-footer__status">
        <a href="https://app.netlify.com/sites/prdev/deploys" target="_blank" no-decoration>
          <img
            src="https://api.netlify.com/api/v1/badges/b41bef05-e33b-497c-bfcf-8e46391b6768/deploy-status"
            alt="Netlify status"
            style="filter: grayscale(1); opacity: 0.5;"
          />
        </a>
      </div>
    </div>
  </SectionContent>
</footer>

<style type="scss">
  .page-footer {
    padding: clamp(1rem, 2vw, 2rem) 0 2rem;
    color: $colorLightGrayLight;

    &__content {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto 1fr;
      align-items: center;
      gap: 0.5rem 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
    }

    &__navigation {
      display: flex;

      :global.navigation-list {
        padding: 0;
        list-style: none;
        display: flex;
        border: solid 2px $colorBorder;
        border-radius: 3px;

        @media (max-width: 768px) {
          border-width: 1px;
        }

        li {
          &:not(:last-child) {
            border-right: solid 1px $colorBorder;
          }
        }

        a {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          padding: 0.75em 1em;
          text-decoration: none;

          &:hover {
            color: $colorWhite;
          }

          &.active {
            color: $colorYellow;
          }

          @media (max-width: 768px) {
            padding: 0.5em;
          }
        }
      }

      @media (max-width: 768px) {
        justify-content: center;
      }
    }

    &__status {
      margin-top: 1rem;

      @media (max-width: 768px) {
        order: 1;
        margin-top: 3em;
        justify-self: center;
      }
    }

    &__info {
      grid-column: 1 / 3;

      @media (max-width: 768px) {
        text-align: center;
        grid-column: initial;
      }
    }

    &__social-media {
      display: flex;
      justify-content: flex-end;

      a {
        padding: 0.5rem;

        img {
          width: 40px;
        }
      }

      @media (max-width: 768px) {
        justify-content: center;
        margin-bottom: 1rem;
      }
    }

    &__afiliates {
      display: flex;
      align-items: center;
      gap: 1em;

      &__external-logo {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;

        .label {
          position: absolute;
          color: $colorLightGray;
          font-size: 0.6em;
          text-transform: uppercase;
          font-family: $fontPunch;
          letter-spacing: 1px;
          font-weight: bold;
          overflow: hidden;
          margin-bottom: 0.5em;
          transform: translateY(0);
          opacity: 0;
          transition: opacity 200ms ease, transform 200ms ease;
        }

        &:hover {
          .label {
            display: block;
            transform: translateY(-100%);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          img {
            max-width: 75px;
          }
        }
      }

      @media (max-width: 768px) {
        justify-content: center;
      }
    }
  }
</style>
