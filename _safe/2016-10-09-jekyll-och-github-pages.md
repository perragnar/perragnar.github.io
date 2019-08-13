---
layout: post
title: Jekyll och GitHub Pages
seo-title: Jekyll och GitHub Pages
seo-description: |
  Vad är en statiskt genererad webbplats (Static Site Generator) och vem är Jekyll?
excerpt: |
  Vad är en statiskt genererad webbplats (Static Site Generator) och vem är Jekyll?
tags:
  - Jekyll
  - Static site generator
categories:
  - Noterat
poster: webdev-header.jpg
comments: true
draft: false
---

<img src="{{ site.baseurl }}/assets/postfiles/jekyll-logo.png" alt="Jekyll logotyp" class="float-right" style="width: 400px; max-width: 50%;" loading="lazy" />

## Jekyll, är inte det den där snubben med dubbla personligheter?
— Stämmer bra. [Robert Louis Stevenson](https://sv.wikipedia.org/wiki/Robert_Louis_Stevenson) skrev på 1800-talet en bok om [Dr Jekyll och sitt alter ego Mr Edward Hyde](https://sv.wikipedia.org/wiki/Dr._Jekyll_och_Mr._Hyde). Men nog om Robert Louis Stevenson och hans karaktärer.
**Jekyll** är även ett verktyg för att skapa statiska HTML-sidor av enkla textfiler och är utvecklat av [Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner), en av [Githubs](https://www.github.com) grundare. Jekyll är skrivet i Ruby och distribuerat under en Open Source licens.

## Static Site Generator

– Statisk webbplatsgenerator, heter det så på Svenska? Hur fungerar det?  
– Det finns en uppsjö verktyg för detta och de flesta fungerar på samma sätt. Designen är separerad från innehållet i form av mallar och textfiler och de bakas ihop till en färdig webbsida.

<figure markdown="1">
  ![Static site generator - flöde]({{ site.baseurl }}/assets/postfiles/ssg.jpg)
  <figcaption>Jekylls arbetsflöde</figcaption>
</figure>

Det finns olika sätt att "dynamiskt" skapa innehållet på sidorna och för det använder Jekyll mallspråket [Liquid](http://shopify.github.io/liquid/). Med Liquid går det att likt andra språk använda **loopar**, **if-satser** och andra metoder för att bygga olika layouter.

Här är ett exempel på en loop i Liquid för en enkel huvudmeny.

{% highlight html linenos %}
{% raw %}
<ul class="main-menu">
  {% for link in site.navigation %}
    <li><a href="{{ site.baseurl }}{{ link.url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

## Varför Jekyll och inte Wordpress?

**Wordpress är ett kraftfullt verktyg** för att driva en webbsida. Jag tycker dock att det är en smula långsamt att jobba med men i övrigt ser jag inga nackdelar eller fel med det. Det finns en anledning till att Wordpress är den ledande plattformen för att publicera webbsidor på idag.

Dock är Wordpress överkvalificerat för mitt behov. Det krävs en webbplats med en MySql-server och det kostar pengar att hyra in sig på ett webbhotell (i dags läge runt 1000 kr per år för ett respektabelt och pålitligt webbhotell i Sverige).

Förmodligen pga Toms Preston-Werners inblandning i GitHub kan du husera din Jekyll-genererade webbplats hos GithHub helt gratis via [GitHub Pages](https://pages.github.com/) och det är en av anledningarna till att jag valt Jekyll. Frågan är om Jekyll och GitHub räcker till för att driva en enkel hemsida för det finns begränsningar. I min mening är begränsningarna tillräckligt få för att det ska fungera.

Här är GitHubs egna presentation av GitHub Pages:

<div class="full-width margin">
  <div class="responsive-container ratio-50">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/2MsN8gpT6jY" frameborder="0" allowfullscreen></iframe>
  </div>  
</div>

## Andra fördelar med Jekyll

Det här gäller inte bara Jekyll utan alla statiska webbplatser. Detta oavsett om de är genererade av verktyg som Jekyll eller om du knackad in HTML-koden för hand.

- Webbservern genererar inte sidorna varje gång de öppnas. Sidorna är redan HTML och redo att visas upp i webbläsaren. Det betyder att webbplatsen blir snabbladdad.
- Det finns inget att hacka sig in i. Varken databas eller administrationsgränssnitt finns och på så sätt slipper man den huvudvärken.
- Lätt att redigera och lägga till innehåll via verktyg man själv är van att använda, eller via ditt repository direkt på [github.com](https://github.com) via webbläsaren.

## perragnar.com och Jekyll

I skrivande stund är perragnar.com hostad av GitHub Pages och är genererad av Jekyll. Jag ska testa att köra Jekyll ett tag för att se om det fungerar bra och om jag stöter på några problem.

Källkoden till perragnar.com finns på [github.com/perragnar/perragnar.github.com](https://github.com/perragnar/perragnar.github.io).
