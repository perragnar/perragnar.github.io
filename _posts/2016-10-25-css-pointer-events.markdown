---
title: CSS pointer-events
layout: post
seo-title: Vad är CSS pointer-events?
seo-description: Här är ett utmärkt CSS-trick för att kunna "klicka igenom" ett element som ligger ovanför ett annat.
tags:
  - CSS
  - pointer-events
categories:
  - Webbutveckling
poster: css-header.jpg
comments: true
excerpt: |
  Här är ett utmärkt CSS-trick för att kunna "klicka igenom" ett element som ligger ovanför ett annat.
---

Tänk dig följande... Du har ett diagram som ligger i en `<div class="chart">` och i en annan `<div class="chart-info">` ligger information. Elementet *chart-info* flyter ovanför för att visa informationen som ett lager på tabellen.

Vad händer om vi vill kunna klicka på säg en stapel i diagrammet? Eftersom lagret *chart-info* ligger ovanför kommer vi inte åt det underliggande lagret och då triggas inte klickeventet.

Det finns sätt att i CSS tala om att ett element inte ska vara klickbart och det kan vi använda på elementet *chart-info*.

{% highlight CSS linenos %}
.chart-info {
  pointer-events: none;
}
{% endhighlight %}

I skrivande stund stöds `ponter-events` av de flesta webbläsare fr o m senaste versionen, med undantag för Opera Mini.
Källa: [caniuse.com](http://caniuse.com/#search=pointer-events)
