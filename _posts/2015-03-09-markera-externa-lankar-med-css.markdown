---
title: Markera externa länkar med CSS
layout: post
categories:
  - Webbutveckling
tags:
  - CSS
  - Länkar
excerpt: |
  Lägg till en ikon för externa länkar med ett enkelt CSS-trick.
---
Av olika anledningar vill man ibland undvika `target="_blank"` på sina länkar för att öppna dem i nytt webbläsarfönster. Då kan det vara en bra idé att markera sina länkar med en liten ikon för att tala om att man lämnar sidan man är på.

<!--more-->

Detta görs ofta med en liten pil;

![Pil]({{ site.baseurl }}/assets/postfiles/icon-external-link.png)

eller en kedjelänk;

![Länk]({{ site.baseurl }}/assets/postfiles/icon-link.png)

### Koden

Här är ett bra sätt att i CSS markera externa länkar. Använd `[href^="http"]` för att hitta alla länkar på sidan som innehåller "http" som i de flesta fall bara används i externa länkar.

Lägg till din ikon som en högerställd bakgrundsbild och lägg till extra padding för att göra plats för ikonen.

#### CSS
{% highlight css linenos %}
a[href^="http"] {
  background: url(external-link-icon.png) no-repeat right;
  padding-right: 20px; /* Padding beror på storleken på ikonen */
}
{% endhighlight %}

[external-link-icon-1]: http://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/VisualEditor_-_Icon_-_External-link.svg/120px-VisualEditor_-_Icon_-_External-link.svg.png
[external-link-icon-2]: https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/128/link.png
[external-link-icon-example]: content/files/external-link-icon-example.png
