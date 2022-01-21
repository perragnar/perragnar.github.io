import { readable } from 'svelte/store';

// The galleries.
const galleries = [
  {
    title: 'Landskap',
    slug: 'landscape',
    coverImage: 'hogby-fyr-l.jpg',
    coverIcon: 'hogby-fyr-m.jpg',
    coverThumbnail: 'hogby-fyr-s.jpg',
    description: `
      Landskapsfotografering är min absoluta favoritkategori. Att fånga ett landskap i en fin komposition med ett fint ljus är något jag älskar att göra.
    `,
    content: `
      <p>
        Men vad är egentligen landskapsfotografering? Vad skiljer landskapsfoto från naturfoto? Är en klunga mikroskopiska svampar också ett landskap, eller är det macro?<br />Jag tycker att gränserna är luddiga och det finns inga rätt eller fel.
      </p>
    `,
    images: [
      {
        files: {
          thumbnail: 'autumn-lake-t.jpg',
          small: 'autumn-lake-s.jpg',
          medium: 'autumn-lake-m.jpg',
          large: 'autumn-lake-l.jpg',
        },
        slug: 'autumn-lake',
        title: 'Early Birds',
        description: `
          <p>
            En tidig förmiddag någonstans i nordvästra Dalarna. Dimman hade legat tät under den tidiga morgonen men var nästan helt borta nu. Två svanar har börjat sin dagliga rutin och glider sakta fram på sjön.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'hogby-fyr-t.jpg',
          small: 'hogby-fyr-s.jpg',
          medium: 'hogby-fyr-m.jpg',
          large: 'hogby-fyr-l.jpg',
        },
        slug: 'hogby-fyr',
        title: 'Högby fyr',
        description: `
          <p>
            Högby fyr på norra Öland med sitt fyrtorn som sträcker sig upp och fångar den sista solstrålen för dagen.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'lillnipen-t.jpg',
          small: 'lillnipen-s.jpg',
          medium: 'lillnipen-m.jpg',
          large: 'lillnipen-l.jpg',
        },
        slug: 'lillnipen',
        title: 'Lillnipen',
        description: `
          <p>
            Det var en väldigt blåsig dag vid Nipfjället. Molnen drev snabbt förbi och när luckorna mellan molnen släppte igenom solen blev delar av fjällen upplysta.<br />
            Här är Lillnipen upplyst av kvällssolen.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'storstupet-bridge-t.jpg',
          small: 'storstupet-bridge-s.jpg',
          medium: 'storstupet-bridge-m.jpg',
          large: 'storstupet-bridge-l.jpg',
        },
        slug: 'storstupet',
        title: 'Storstupet',
        description: `
          <p>
            Storstupet med sin imponerande järnvägsbro.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'kohagen-t.jpg',
          small: 'kohagen-s.jpg',
          medium: 'kohagen-m.jpg',
          large: 'kohagen-l.jpg',
        },
        slug: 'kohagen',
        title: 'Kohagen',
        description: `
          <p>
            En av många kohagar på Ängsö med sina fina träd.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'swiks-t.jpg',
          small: 'swiks-s.jpg',
          medium: 'swiks-m.jpg',
          large: 'swiks-l.jpg',
        },
        slug: 'tidens-tand',
        title: 'Tidens tand',
        description: `
          <p class="intro">
            När jag närmade mig vraket av Swiks såg jag regnmolnet som drog en slöja av regn efter sig ut till havs.
            Flocken med fåglar kom in från land och snabbt tog jag fram kameran och knäppte en bild, utan att hinna tänka så mycket.
          </p>
          <p>
            Den här bilden gillar jag för att kompositionen var inte genomtänkt alls men blev, enligt mig, väldigt lyckad.
            Det är mycket dramatik och lite vemod i bilden som jag tycker passar ödet av den gamla skonaren.
          </p>
          <cite>Swiks, eller Swix, var en åländsk tremastad skonare som förliste utanför Ölands nordöstra spets den 21 december 1926. Skeppsvraket ligger kvar på stranden strax innanför förlisningsplatsen.<em>~ Wikipedia</em></cite>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
    ],
  },
  {
    title: 'Djur',
    slug: 'animals',
    coverImage: 'reindeer-l.jpg',
    coverIcon: 'reindeer-m.jpg',
    coverThumbnail: 'reindeer-s.jpg',
    description: `
      När det kommer till att fotografera djur är jag en nybörjare. Än så länge har jag bara
      fotograferat husdjur och fåglar i trädgården men tanken på att ligga och vänta på att
      en räv ska dyka upp ur sitt gryt och försöka fånga en bra bild medan den fortfarande
      inte sett mig lockar.
    `,
    content: `
      <p>
        OK, några foton har det väl blivit på djur i det vilda. Mitt supertele ligger och
        väntar på att få användas och bara några minuter hemifrån har jag både räv- och
        grävlinggryt, massor av rådjur och hjortar. Vildsvin och älgar finns det också,
        samt örnar, vråkar, hökar och ugglor.
      </p>
    `,
    images: [
      {
        files: {
          thumbnail: 'reindeer-t.jpg',
          small: 'reindeer-s.jpg',
          medium: 'reindeer-m.jpg',
          large: 'reindeer-l.jpg',
        },
        slug: 'fjallets-konung',
        title: 'Fjällets konung',
        description: `
          <p>
            Den här vita renen gjorde sig bra på bild. Den sticker verkligen ut med sin vita päls mot den mörka
            fjällsidan. Den patrullerade runt flocken och såg till att andra yngre hannar höll sig på behörigt avstånd.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
      {
        files: {
          thumbnail: 'cow-t.jpg',
          small: 'cow-s.jpg',
          medium: 'cow-m.jpg',
          large: 'cow-l.jpg',
        },
        slug: 'highland-cattle',
        title: 'Highland Cattle',
        description: `
          <p>
            Säg hej till den här ståtliga... kon? Jag brukar säga att det är en lurvig ko men jag tror att det rätta
            namnet är väl Highland Cattle? Hur som helst ville den i alla fall vara med på bild och det är jag tacksam
            för.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
    ],
  },
  {
    title: 'Byggnader',
    slug: 'architecture',
    coverImage: 'sala-gummi-l.jpg',
    coverIcon: 'sala-gummi-m.jpg',
    coverThumbnail: 'sala-gummi-s.jpg',
    description: `
      Det finns hus och så finns det hus som blir bra på bild.
    `,
    content: `
      <p>
        Hus kan berätta en historia och jag gillar att fotografera hus och byggnader som har varit med om
        mycket, har en historia eller bara har karaktär och ser intressant ut.
      </p>
    `,
    images: [
      {
        files: {
          thumbnail: 'sala-gummi-t.jpg',
          small: 'sala-gummi-s.jpg',
          medium: 'sala-gummi-m.jpg',
          large: 'sala-gummi-l.jpg',
        },
        slug: 'sala-gummi',
        title: 'Sala Gummi AB',
        description: `
          <p>
            Den karaktäristiska gummiverkstaden i Sala en novembereftermiddag.
          </p>
        `,
        printPreviews: ['regular', 'monochrome'],
      },
    ],
  },
];

export const galleryStore = readable(galleries);

export const getGalleryCategory = (section) => {
  // Filter the galleries.
  const gallerySection = galleries.filter((gallery) => {
    return gallery.slug === section;
  });

  return gallerySection[0];
};
