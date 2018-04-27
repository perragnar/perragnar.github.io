---
title: Ignorera filer eller mappar i Git
seo-title: Ignorera filer eller mappar i Git
seo-description: Hur gör man för att ignorera filer i Git efter att de redan finns cachade? Kan man ta bort dem från versionshanteringen utan att radera filerna?
layout: post
categories:
  - webbutveckling
tags:
  - Gitignore
  - Git
poster: git-header.jpg
excerpt: |
  Hur gör man för att ignorera filer i Git efter att de redan finns cachade? Kan man ta bort dem från versionshanteringen utan att radera filerna?
---
För att be Git ignorera filer eller mappar behöver du bara se till att du har en fil i din `Git root` som heter `.gitignore` och i den lägger du till fil- eller mappnamnet på den fil eller mapp du vill ignorera. — Men vad händer om du redan sedan tidigare lagt till filen eller mappen i ditt Gitbibliotek? Hur tar du bort filen/mappen utan att radera filerna från disk?

Börja med att lägga till filen/filerna/mappen i `.gitignore` så att filerna inte kommer med i din Git stage om de ändras.

För att ta bort en fil skriver du bara följande:

{% highlight plaintext linenos %}
git rm --cached fil.txt
{% endhighlight %}

För att tag bort flera filer åt gången:

{% highlight plaintext linenos %}
git rm --cached fil1.txt fil2.txt fil.txt
{% endhighlight %}

För att ta bort en hel mapp:

{% highlight plaintext linenos %}
git rm -r --cached mapp
{% endhighlight %}

Slutligen måste du köra "commita" dina ändringar.
Dessutom bör du lägga till filerna i din `.gitignore` om du inte vill versionshantera dem.
