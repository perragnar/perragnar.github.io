---
title: Hantera specifika filer i Git
layout: post
categories:
  - webbutveckling
tags:
  - Gitignore
  - Git
poster: git-header.jpg
excerpt: |
  Vill du versionshantera bara en eller ett fåtal filer med Git? Läs mer om detta enkla sätt med hjälp av .gitignore.
---
När du skapar ett _repository_ så räknar Git med att alla filer i katalogen ska versionshanteras. I vissa fall kanske bara en eller några enstaka filer behöver versionshanteras och då kan man använda _.gitignore_ för att inte bara ge instuktioner om vilka filer som inte ska hanteras utan även vilka som __ska__ hanteras.

<!--more-->

### Lite kort om .gitignore
Skapar du en fil som heter `.gitignore` i root-mappen för dit Git repository och i den anger filer eller mappar så kommer Git att ignorera dem. 

- Ignorera enstaka filer genom att skriva t ex `index.html`
- Ignorera en filtyp genom att skriva t ex `*.html`
- Ignorera en mapp genom att skriva t ex `images/`

### Hur gör man då för att versionshantera enstaka filer?
Första steget är tala om för Git att __alla__ filer ska ignoreras. Om du inte har filen `.gitignore`, skapa den och lägg till denna rad:

{% highlight plaintext linenos %}
*.*
{% endhighlight %}

Då vet Git att den ska ignorera alla filer, även i underkataloger.  
Säg att vi vill bara versionshantera en fil som heter `structure.json`. Lägg då till denna rad till i `.gitignore`:

{% highlight plaintext linenos %}
!structure.json
{% endhighlight %}

Det som händer när man lägger till ett utropstecken innan en fil eller mapp är att man talar om att istället för att _ignorera_ ska _inkludera_ den.  
Så här ser då vår `.gitignore` ut:

{% highlight plaintext linenos %}
*.*
  !structure.json
{% endhighlight %}
