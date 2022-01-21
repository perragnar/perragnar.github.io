<script context="module">
  export const prerender = true;
</script>

<script>
  import { onMount } from 'svelte';

  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  let inputName;

  onMount(() => {
    inputName.select();
  });

  // Route source.
  routeStore.setRoute('/contact');
</script>

<svelte:head>
  <title>Kontakt</title>
</svelte:head>

<Hero images="/images/hero/buskar.jpg" faded={true} />

<SectionContent>
  <h1>Kontakt</h1>
  <p class="intro">Har du något på hjärtat kan du skicka ett meddelande med formuläret nedan.</p>
  <p>
    Tänk på att om du vill att jag kontaktar dig så måste du fylla i din e-postadress, alternativt lämna info om hur jag
    kontaktar dig i meddelandefältet.
  </p>
  <p>Vi hörs!</p>
</SectionContent>

<SectionContent>
  <form
    name="contact-form"
    class="contact-form"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    action="/form-sent-contact"
  >
    <input type="hidden" name="form-name" value="contact-form" />
    <p>
      <label for="name">Namn: </label>
      <input type="text" name="name" bind:this={inputName} />
    </p>
    <p>
      <label for="email">E-post: </label>
      <input type="email" name="email" />
    </p>
    <p>
      <label for="message">Meddelande: </label>
      <textarea name="message" required rows="10" />
    </p>
    <div data-netlify-recaptcha="true" />
    <p style="text-align: right;">
      <button type="submit" class="button button--basic button--right contact-form__submit">Skicka</button>
    </p>
  </form>
</SectionContent>

<style type="scss">
  .contact-form {
    label {
      display: block;
      font-size: 0.7em;
      text-transform: uppercase;
      font-family: $fontPunch;
      letter-spacing: 1px;
      color: $colorLightGray;
    }

    input[type='text'],
    input[type='email'] {
      line-height: 1;
    }

    input[type='text'],
    input[type='email'],
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

      &:hover {
        border-color: $colorYellowLight;
      }

      &:focus-visible {
        outline: none;
        border-color: $colorBlue;
      }
    }
  }
</style>
