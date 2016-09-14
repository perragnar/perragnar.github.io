---
title: Kommentarer med Emmet
layout: post
categories: 
  - Webbutveckling
tags:
  - emmet
  - kommentarer
poster: emmet-comments-header.jpg
excerpt: |
  Konfigurera Emmet att lägga till kommentarer som du vill ha dem.
---
[Emmet](http://emmet.io/) är ett plugin till olika textredigerare för att underlätta och snabba upp arbetsflödet. Det fungerar genom att med likt CSS selectors skriva semantiken som sedan konverteras till HTML med attribut, värden och innehåll.

> Emmet — the essential toolkit for web-developers.
Emmet is a plugin for many popular text editors which greatly improves HTML &amp; CSS workflow.

Tanken med den här artikeln är att visa hur man med hjälp av Emmet kan skräddarsy och lägga till kommentarer <del>automatiskt</del> genom att snällt be om det. :)

<!--more-->

__Förtydligande__: _Emmet har out of the box kommentering men genom att lägga till ett eget filter kan du göra om kommentarerna så det passar dig och ditt arbetssätt._

### — Vad är det som ska kommenteras?
— När en html-sida börjar få många _nested elements_ (kapslade element enl. Google Translate) så är det ofta svårt att se vilken sluttagg som hör till vilket element. Då är det behändigt att kommentera sina sluttaggar med CSS-IDt eller klassnamnet så man snabbt hittar vilket element sluttaggen tillhör.

#### Simpelt exempel
{% highlight html linenos %}
<div class="wrapper">
  <h1>Titel</h1>
</div><!-- .wrapper -->
{% endhighlight %}

Kanske inte så mycket nytta just i detta fallet men så fort det börjar blir fler element och innehåll så trycks sluttaggen ner i semantiken vilket också gör det svårare att hitta igen den.

Kolla på det här:
{% highlight html linenos %}
<div class="box-1">
  <div class="box-2">
    <div class="box-3">
      <div class="box-4">
        <div class="box-5">
          <div class="box-6">
            <div class="box-7">
              <div class="box-8">
                <div class="box-9">
                  <div class="box-10">
                    <p><a href="https://en.wikipedia.org/wiki/Matryoshka_doll">Imma Matryoshka doll, LOL</a></p>
                  </div><!-- .box-10 -->
                </div><!-- .box-9 -->
              </div><!-- .box-8 -->
            </div><!-- .box-7 -->
          </div><!-- .box-6 -->
        </div><!-- .box-5 -->
      </div><!-- .box-4 -->
    </div><!-- .box-3 -->
  </div><!-- .box-2 -->
</div><!-- .box-1 -->
<p>...men nu ser jag vilken som slutar var!</p>
{% endhighlight %}

Nu kanske du förstår vad jag menar med nyttan av kommentarerna.

### Konfigurera Emmet i Sublime Text
Nu finns Emmet till olika textredigerare men i detta exempel ska jag visa hur man kan konfigurera Emmet för [Sublime Text](http://www.sublimetext.com).

Öppna Emmets inställningsfil genom att via menyn i Sublime Text gå till `Preferences -> Package Settings -> Emmet -> Settings User`.

Om du inte redan lagt till några inställningar för Emmet är filen mest troligt tom, så börja med att lägg till
{% highlight plaintext linenos %}
{
  "preferences": {

  }
}
{% endhighlight %}

Sedan ska det läggas till en inställning som heter `filter.commentAfter` som innehåller själva kommentaren och bestämmer hur den ser ut.

Default i Emmet lägger den till kommentaren på en ny rad, vilket jag inte alls gillar. Det är självklart upp till dig hur du vill att kommentaren ska se ut men jag tycker personligen att den ska ligga på samma rad som sluttaggen.

För att få det resultatet lägger vi till denna sträng `"<!--<%= attr(\"id\", \"#\") %><%= attr(\"class\", \".\") %> -->"` i inställningen `filter.commentAfter`.
Det talar om att det ska, om det finns, läggas till ID och/eller klass(er) i kommentaren.

Så här ska inställningsfilen se ut när den är klar;
{% highlight plaintext linenos %}
{
  "preferences": {
    "filter.commentAfter": "<!-- <%= attr(\"id\", \"#\") %><%= attr(\"class\", \".\") %> -->"
  }
}
{% endhighlight %}
That's it! Mer behövs det inte och du kan lätt ändra i strängen för att få kommentaren precis som du vill ha den.

### Så här lägger du till kommentarer med Emmet
Det enda du behöver göra är att lägga till `|c` efter din Emmet markup så lägger den till kommentarer på alla sluttaggar. Dock lägger den inte till kommentarer på taggar som ligger på samma rad eftersom det inte är svårt att identifiera sluttaggen. T ex

{% highlight html linenos %}
<p class="text">Lorem ipsum Nulla pariatur</p>
{% endhighlight %}

#### Exempel 1
Vi börjar enkelt.

{% highlight plaintext linenos %}
header.wrapper>h1{Titel}|c
{% endhighlight %}

... ger resultatet:

{% highlight html linenos %}
<header class="wrapper">
  <h1>Titel</h1>
</header><!-- .wrapper -->
{% endhighlight %}

#### Exempel 2
Lite mer markup.

{% highlight plaintext linenos %}
header.page-header>.row>.col.col-100>h1{Title}
{% endhighlight %}

... ger resultatet:

{% highlight html linenos %}
<header class="page-header">
  <div class="row">
    <div class="col col-100">
      <h1>Title</h1>
    </div><!-- .col col-100 -->
  </div><!-- .row -->
</header><!-- .page-header -->
{% endhighlight %}

Lägg märke till att den inte lägger till kommentarer på element som ligger på samma rad.

#### Exempel 3
Ytterligare markup.

{% highlight plaintext linenos %}
.row>.col.col-50>p{Left column content}+.col.col-50>h2{Menu}+ul#menu.menu>li*5>a[href=#]{Link $}|c
{% endhighlight %}

... och resultatet blir då;

{% highlight html linenos %}
<div class="row">
  <div class="col col-50">
    <p>Left column content</p>
    <div class="col col-50">
      <h2>Menu</h2>
      <ul id="menu" class="menu">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        <li><a href="#">Link 4</a></li>
        <li><a href="#">Link 5</a></li>
      </ul><!-- #menu.menu -->
    </div><!-- .col col-50 -->
  </div><!-- .col col-50 -->
</div><!-- .row -->
{% endhighlight %}

### Emmet, vad är det?
Jag förutsätter i artikeln att du redan vet vad Emmet är, men skulle du inte ha hittat detta guldkorn tidigare är det väl värt att titta på vad det kan göra för dig.

Det behöver inte vara att den ska skapa en hel HTML markup åt dig men kanske den kan snabba upp vissa saker. Jag använder det ofta som en ersättning för snippets.

Emmet hittar du på [emmet.io](http://emmet.io/).

<iframe src="https://www.youtube.com/embed/0uIPGgq9R5Y" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

### Avslutning
Hoppas detta tips har hjälpt dig lite i alla fall i strävan att hitta det perfekta arbetsflödet.

Jag har använt Emmet (tidigare Zen Coding) sedan ganska länge tillbaka och det är först nu jag upptäckt att den kan kommentera koden.
