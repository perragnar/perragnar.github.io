---
title: Sublime Text - Typsnittsinställningar (Windows)
seo-title: Sublime Text - Typsnittsinställningar (Windows)
seo-description: Ser typsnittet i Sublime Text inte bra ut på din Windowsmaskin? Det finns en inställning du kan testa för att rendera typsnitten annorlunda.
layout: post
categories:
  - Webbutveckling
tags:
  - Font
  - Sublime Text
  - Typsnitt
poster: sublime-header.jpg
excerpt: |
  Ser typsnittet i Sublime Text inte bra ut på din Windowsmaskin?
  Det finns en inställning du kan testa för att rendera typsnitten annorlunda.
---

I Mac OS ser som regel de flesta programmeringstypsnitten (mono spaced fonts) bra ut pga den utomordentligt bra renderingen av typsnitt. Jag har använt säkert 5-6 olika programmeringstypsnitt genom åren men när jag gick över till Windows-miljö för ett och ett halvt år sedan insåg jag snabbt att typsnitt inte renderas alls lika bra där.

I dag fick jag tipset att lägga till en inställning i Sublime Text som gör att typsnittet renderas på ett annat sätt.

{% highlight text linenos %}
"font_options": [
  "directwrite"
]
{% endhighlight %}

Det gör inte mycket skillnad på alla typsnitt har jag märkt men på typsnitt som t ex _Fira Mono_ blir det avsevärt bättre.
