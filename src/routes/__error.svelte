<script context="module">
  export function load({ status, error, url }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
        status: status,
        page: url.pathname,
      },
    };
  }
</script>

<script>
  import SectionContent from '$lib/components/SectionContent.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Props.
  export let title;
  export let status;
  export let page;

  // Route source.
  routeStore.setRoute('');
</script>

<svelte:head>
  <title>Hoppsan, nåt är fel!</title>
</svelte:head>

<SectionContent>
  <div class="error-wrapper">
    {#if status === 404}
      <img src="/images/404.png" alt="404 - Sidan hittades inte" />
      <h2 class="error-header">Sidan hittades inte</h2>
      <div class="error-message">
        <p>Ber om ursäkt för detta.</p>
        <ul>
          <li><a href="/">Startsidan</a></li>
          <li><a href="/blog">Bloggen</a></li>
          <li><a href="/contact">Kontakta mig</a></li>
        </ul>
      </div>
    {:else}
      <h2 class="error-header">Hoppsan, något gick fel</h2>
      <div class="error-message">
        <p>Ber om ursäkt för detta! Testa att ladda om sidan eller försök igen om en stund.</p>

        <div class="error-form">
          <p>
            <label for="page">Sida:</label>
            <input type="text" name="page" value={page} disabled />
          </p>
          <p>
            <label for="title">Felkod:</label>
            <input type="text" name="title" value={status} disabled />
          </p>
          <p>
            <label for="error-message">Felmeddelande:</label>
            <textarea name="error-message" required rows="3" disabled>{title}</textarea>
          </p>
        </div>
      </div>
    {/if}
  </div>
</SectionContent>

<style type="scss">
  .error-wrapper {
    img {
      max-width: 100%;
    }

    .error-header {
      @media (max-width: 768px) {
        text-align: center;
      }
    }

    .error-message {
      @media (max-width: 768px) {
        text-align: center;
      }

      ul {
        margin: 0 0 2em;
        padding: 0;
        list-style: none;
        display: inline-flex;
        flex-direction: column;

        li {
          a {
            display: block;
            padding: 0.5em;
          }
        }
      }
    }

    .error-form {
      label {
        display: block;
        font-size: 0.7em;
        text-transform: uppercase;
        font-family: $fontPunch;
        letter-spacing: 1px;
        color: $colorLightGray;
      }

      input[type='text'] {
        line-height: 1;
      }

      input[type='text'],
      textarea {
        background-color: $colorBorder;
        width: 100%;
        font-size: inherit;
        padding: 1em;
        color: inherit;
        border: solid 2px transparent;
        border-radius: 3px;
        transition: border 200ms ease;

        @media (max-width: 768px) {
          border-width: 1px;
        }
      }
    }
  }
</style>
