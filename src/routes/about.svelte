<script context="module">
  export const prerender = true;
</script>

<script>
  // Components.
  import SectionContent from '$lib/components/SectionContent.svelte';
  import Hero from '$lib/components/PageHeader/Hero.svelte';

  // Stores.
  import { routeStore } from '$lib/stores/navigationStore';

  // Route source.
  routeStore.setRoute('/about');
</script>

<svelte:head>
  <title>Om</title>
  <meta name="description" content="Om Per Ragnar Edin" />
</svelte:head>

<Hero images="/images/hero/me-lego.jpg" faded={true} />

<SectionContent>
  <h1>Hej!</h1>
  <p class="intro">
    Per Ragnar Edin heter jag och är hobbyfotograf sedan 2017 och det jag gillar att fotografera mest av allt är
    landskap och natur men jag gillar att utforska nya områden inom fdoto och älskar att lära och förbättra mig.
  </p>
  <p>
    Jag bor i Västmanland sedan 10 år men kommer ursprungligen från Jämtland. Under de åren har jag haft ett eget
    företag i fem år men jobbar nu som webbutvecklare på ett litet företag i Västerås/Stockholm.
  </p>
  <p>Här är några av mina förebilder och inspirationskällor när det handlar om fotografering.</p>
  <ul class="reference-list">
    <li>
      <a href="https://baxter.photos" target="_blank">Simon Baxter</a>
    </li>
    <li>
      <a href="https://isabellatabacchi.com" target="_blank">Isabella Tabacchi</a>
    </li>
    <li>
      <a href="https://www.adamgibbs.com" target="_blank">Adam "Uncle Grumpy" Gibbs</a>
    </li>
    <li>
      <a href="https://thomasheaton.co.uk" target="_blank">Thomas Heaton</a>
    </li>
    <li>
      <a href="https://www.instagram.com/sophiabergholm" target="_blank">Sophia Bergholm</a>
    </li>
    <li>
      <a href="https://www.instagram.com/sannalinn" target="_blank">Sandra Linnell</a>
    </li>
    <li>
      <a href="https://www.nickpagephotography.com" target="_blank">Nick Page</a>
    </li>
    <li>
      <a href="https://www.nickcarverphotography.com" target="_blank">Nick Carver</a>
    </li>
    <li>
      <a href="https://www.instagram.com/danielselinsofia" target="_blank">Elin Daniels</a>
    </li>
    <li><a href="https://www.benhorne.com" target="_blank">Ben Horne</a></li>
    <li>
      <a href="https://www.jamespopsys.com" target="_blank">James Popsys</a>
    </li>
    <li>
      <a href="https://www.instagram.com/pamelamarshallphotos" target="_blank">Pamela Marshall</a>
    </li>
    <li>
      <a href="https://www.instagram.com/sonja_josefsson" target="_blank">Sonja Josefsson</a>
    </li>
    <li>
      <a href="https://www.shainblumphoto.com" target="_blank">Michael Shainblum</a>
    </li>
    <li>
      <a href="https://simonboothphotography.com" target="_blank">Simon Booth</a>
    </li>
    <li>
      <a href="https://visualisingscotland.co.uk" target="_blank">Kim Grant - Visualising Scotland</a>
    </li>
    <li>
      <a href="https://www.fototripper.com" target="_blank">Gavin Hardcastle - Phototripper</a>
    </li>
    <li>
      <a href="https://www.laura-oppelt-photography.de" target="_blank">Laura Oppelt</a>
    </li>
  </ul>
  <p>
    Förutom ovan nämnda har jag även förebilder i min närhet, bl a i <a
      href="https://www.salafotoklubb.com/"
      target="_blank">Sala Fotoklubb</a
    >, som jag lärt mig mycket av och fått inspiration från.
  </p>
  <p>
    Ta gärna en titt i <a href="/blog">bloggen</a> eller
    <a href="/photo">läs mer om min fotografering och bilder</a>.<br />
    Jag lägger mer eller mindre regelbundet upp bilder på både
    <a href="https://www.instagram.com/perragnarfoto" target="_blank">Instagram</a>
    och
    <a href="https://www.facebook.com/perragnarfoto" target="_blank">Facebook</a>.
  </p>
</SectionContent>

<SectionContent>
  <div class="sign">
    <img src="/images/signature.svg" alt="Per Ragnar Edins signatur" class="sign__signature" />
  </div>
</SectionContent>

<style type="scss">
  .reference-list {
    columns: 2;
    column-gap: 2rem;
    padding: 0 0 0 1.2rem;

    @media (max-width: 768px) {
      columns: 1;
    }

    li {
      a {
        display: inline;
      }
    }
  }

  .sign {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    &__signature {
      max-width: 400px;
    }
  }
</style>
