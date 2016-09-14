---
title: Lagra filer temporärt med git stash
layout: post
categories:
  - Webbutveckling
tags:
  - git
  - nyborjare
  - stash
  - tips
poster: git-header.jpg
excerpt: |
  Ibland behöver man avbryta det man håller på med för att t ex byta branch och fortsätta med annan kod. Hur gör man då med de filer man arbetar med för tillfället utan att behöva göra en git commit? Det du behöver är git stash.
---
## Vad gör git stash?

— `git stash` lägger undan dina filer till en temporär plats medan du t ex måste byta branch för att göra annat så länge.

> Stashing takes the dirty state of your working directory — that is, your modified tracked files and staged changes — and saves it on a stack of unfinished changes that you can reapply at any time.

<!--more-->

## Exempel

Låt oss skapa ett enkelt scenario där vi har några enkla filer i branchen **master**:

{% highlight plaintext linenos %}
.
├── index.php
├── css
│   └── main.css
├── js
│   └── functions.js
└── scss
    └── main.scss
{% endhighlight %}

Nu ska vi lägga till en cool funktion till vår webbsida och skapar därför en ny branch som vi döper till **cool-new-feature**.

{% highlight plaintext linenos %}
git branch cool-new-feature
git checkout cool-new-feature
{% endhighlight %}

eller om man vill göra bägge kommandon i samma svep:

{% highlight plaintext linenos %}
git checkout -b cool-new-feature
{% endhighlight %}

Vi lägger till filen `js/cool-new-feature.js` och länkar in den i `index.php`. Nu har vi en modifierad fil (index.php) samt en ny fil (js/cool-new-feature.js).

Låt oss säga att det ska göras en ändring i CSS-filen som inte kan vänta. Ändringen har inget med vår coola nya funktion att göra och eftersom vi inte vill commita den ännu vill vi göra en ny branch (baserad på **master**) och stoppa undan våra 'dirty', eller modifierade, filer så länge i en stash. 

Skulle vi försöka lägga filerna i en stash nu kommer vi att få ett felmeddelande eftersom filen `js/cool-new-feature.js` inte ännu lagts till i index. Det gör vi genom att skriva:

{% highlight plaintext linenos %}
git add js/cool-new-feature.js
{% endhighlight %}

Nu har vi inga oindexerade filer och kan då spara undan dem i en stash. 

{% highlight plaintext linenos %}
git stash save "Cool funktion, ej färdig"
{% endhighlight %}

Vi kan kontrollera att det sparats undan genom att skriva

{% highlight plaintext linenos %}
git stash list
{% endhighlight %}

Varje stash får ett löpnummer för att kunna hanteras separat. Så här ser det ut efter att vår stash har lagts till:

{% highlight plaintext linenos %}
stash@{0}: On cool-new-feature: Cool funktion, ej färdig
{% endhighlight %}

Nu kan vi byta branch till **master** för att genomföra ändringen och när det är klart och vi återigen är i branchen **cool-new-feature** kan vi hämta våra _stashade_ filer igen.

Om vi vet att de _stashade_ filerna ligger högst upp i stashlistan eller om det bara finns en post i listan kan vi snabbt hämta dem och radera dem från listan i ett svep:

{% highlight plaintext linenos %}
git stash pop
{% endhighlight %}

Har du flera sparade stashes i listan kan du ta tillbaka en specifik post i listan genom att ange indexnumret enligt följande där `{0}` är index:

{% highlight plaintext linenos %}
git stash apply stash@{0}
{% endhighlight %}

_Enligt dokumentationen ska man skriva som ovan men i skrivande stund måste jag ange stash inom citationstecken, dvs `git stash apply 'stash@{0}'`._

Efter att du hämtat filerna från index 0 i stashlistan vill du förmodligen radera dem och det gör du så här:

{% highlight plaintext linenos %}
git stash drop stash@{0}
{% endhighlight %}

_Enligt dokumentationen ska man skriva som ovan men i skrivande stund måste jag ange stash inom citationstecken, dvs `git stash drop 'stash@{0}'`._

## Kommandon

- `git stash save "Meddelande"`  
Sparar alla 'dirty state' filer, dvs modifierade, till en stash. Nya filer som inte lagts till index måste läggas till med `git add <filnamn>`.
- `git stash list`  
Listar alla stashes som du sparat undan.
- `git stash pop`  
Tar den senaste stashen och lägger tillbaka filerna i working directory.
- `git stash apply stash@{n}`
Tar en specifik stash ({n} == index på stashen) och lägger tillbaka filerna i working directory.
- `git stash drop stash@{n}`
Raderar en specifik stash ({n} == index på stashen) från stash list.

## Länkar

- [git-scm.com](https://git-scm.com/book/no-nb/v1/Git-Tools-Stashing)
- [code.tutsplus.com](http://code.tutsplus.com/tutorials/quick-tip-leveraging-the-power-of-git-stash--cms-22988)
- [Corey Shafer @ YouTube: 'Git Tutorial: Using the Stash Command'](https://youtu.be/KLEDKgMmbBI?list=PL-osiE80TeTuRUfjRe54Eea17-YfnOOAx)

### Git lingo

När man som svensk försöker kommunicera med andra låter man förmodligen som [Swedish Chef i Mupparna](https://www.youtube.com/watch?v=MmOdI80sC5U).  
Även om [bjorne](https://github.com/bjorne/) har gjort en fin parlör med översättningar av Git-kommandon, använder jag ändå _svengelska_ när jag skriver.
