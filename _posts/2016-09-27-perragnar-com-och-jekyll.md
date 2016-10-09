---
layout: post
title: perragnar.com och jekyll
tags:
  - Jekyll
  - Static site generator
categories:
  - Noterat
excerpt: |
  Vad är en statiskt genererad webbplats och vem är Jekyll?
comments: false
draft: true
---

## — Jekyll, är inte det den där snubben med dubbla personligheter?
— Stämmer bra. [Robert Louis Stevenson](https://sv.wikipedia.org/wiki/Robert_Louis_Stevenson) skrev på 1800-talet en bok om [Dr Jekyll och sitt alter ego Mr Edward Hyde](https://sv.wikipedia.org/wiki/Dr._Jekyll_och_Mr._Hyde). Men nog om Robert Louis Stevenson och hans karaktärer.

<div class="note" markdown="1">
  <img src="{{ site.baseurl }}/assets/postfiles/jekyll-logo.png" alt="Jekyll logotyp" class="float-left" style="width: 200px; max-width: 50%;" />
  **Jekyll** är även ett verktyg för att skapa statiska htmlsidor utifrån enkla textfiler och är utvecklat av [Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner), en av [Githubs](https://www.github.com) grundare. Jekyll är skrivet i Ruby och distribuerat under en Open Source licens.
</div>

## Varför Jekyll och inte Wordpress?

**Wordpress är ett kraftfullt verktyg** för att driva en webbsida. Jag tycker dock att det är en smula långsamt att jobba med men i övrigt ser jag inga nackdelar eller fel med det. Det finns en anledning till att Wordpress är den ledande plattformen för att publicera webbsidor på idag.

Dock är det otroligt överkvalificerat för mitt behov. Wordpress kräver en webbplats med en MySql-server och det kostar pengar att hyra in sig på ett webbhotell med de kraven.

Förmodligen pga Toms inblandning i GitHub kan du husera din jekyllgenererade webbplats hos Github helt gratis via [GitHub Pages](https://pages.github.com/) och det är en av anledningarna till att jag valt Jekyll. Frågan är om Jekyll och GitHub räcker till för att driva en enkel hemsida för det finns begränsningar. I min mening är begränsningarna tillräckligt få för att det ska fungera.

<div class="full-width margin">
  <div class="responsive-container ratio-50">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/2MsN8gpT6jY" frameborder="0" allowfullscreen></iframe>
  </div>  
</div>

## Hur fungerar Jekyll?

En enkel förklaring är att Jekyll kompilerar en webbplats med hjälp av mallspråket [Liquid](http://shopify.github.io/liquid/) i kombination med enkla textfiler som utgör innehållet i sidan.

<div class="full-width margin" markdown="1">
  <img src="{{ site.baseurl }}/assets/postfiles/ssg.jpg" class="fill-width" alt="Static site generator flöde" />
</div>

Detta kallas för **Static site generator** och det finns en del fördelar med det.

- Dels behöver inte en webbserver generera sidorna varje gång de öppnas. Det betyder att webbplatsen blir snabbladdad.
- Det finns inget att hacka sig in i. Varken databas eller administrationsgränssnitt finns och på så sätt slipper man den huvudvärken.
- Lätt att redigera och lägga till innehåll via verktyg man själv är van att använda, eller via ditt repository direkt på [github.com](https://github.com) via webbläsaren.





[StaticGen](https://www.staticgen.com/)
