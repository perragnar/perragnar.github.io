---
title: "The inline-block issue"
layout: post
categories:
  - Webbutveckling
tags:
  - css
  - inline-block
poster: webdev.jpg
excerpt: |
  Om du jobbar med HTML och CSS har du säkert stött på problemet med att element med `display: inline-block` får en oftast oönskad marginal. Vad beror det på och hur löser man problemet?
---
## — Vad är egentligen problemet?

— Vi kan ta ett vanligt exempel. Vi ska göra en huvudmeny till en hemsida som ska ligga horisontellt i sidhuvudet. Vi börjar med semantiken.

{% highlight html linenos %}
<ul class="main-menu">
  <li class="selected"><a href=".">Home</a></li>
  <li><a href="about">About</a></li>
  <li><a href="blog">Blog</a></li>
  <li><a href="contact">Contact</a></li>
</ul>
{% endhighlight %}

Inga konstigheter. Nu ska vi forma menyn med CSS.

{% highlight css linenos %}
.main-menu {
  list-style: none;
  margin: 0;
  padding: 0
}

.main-menu li {
  display: inline-block;
}

.main-menu li.selected a {
  background-color: #006CAA;
}

.main-menu a {
  display: block;
  line-height: 1;
  color: white;
  background-color: #00A2FF;
  text-decoration: none;
  font-weight: bold;
  padding: 15px;
}
{% endhighlight %}

Så här ser vår meny ut:

![Meny]({{ site.baseurl }}/assets/postfiles/inline-block-issue-fig-1.png)

Här ser vi direkt problemet med `display: inline-block`; mellan varje li ligger en 4 pixlar stor marginal. Anledningen till det är **"whitepspace"** som blir när vi radbryter efter varje `<li>` i HTML. I vårt fall ser det visserligen bra ut med lite luft mellan varje menyalternativ, men i andra fall vill man inte ha marginalen.

![4 pixlar marginal]({{ site.baseurl }}/assets/postfiles/inline-block-issue-fig-2.png)

## Ta kontroll över marginalerna!

För att få bort marginalen kan man göra på olika sätt, bra eller dåliga får du avgöra.

![Ta kontroll över marginalerna]({{ site.baseurl }}/assets/postfiles/inline-block-issue-fig-3.png)

### Ta bort "whitespace" mellan `<li>` eller minifiera HTML

Eftersom det är whitespace mellan elementen som skapar marginalen är det, enligt min personliga åsikt, bästa att ta bort den från semantiken genom att lägga alla `<li>` på en rad.

{% highlight html linenos %}
<ul class="main-menu">
  <li class="selected"><a href=".">Home</a></li><li><a href="about">About</a></li><li><a href="blog">Blog</a></li><li><a href="contact">Contact</a></li>
</ul>
{% endhighlight %}

Jag tycker också att det är bra att minifiera sin HTML (CSS och Javascript också för den delen) och då slipper man whitespace-problematiken genomgående.

### Justera marginalen med CSS

Vill du behålla intederingen och radbrytningarna i din markup för läsbarhet måste du tackla problemet med CSS. Här har vi ett par knep att ta till.

#### Alternativ 1: Negativ marginal

— Låt oss helt enkelt dra av 4 pixlar av marginalen. Helt OK lösning om det måste lösas med CSS.

{% highlight css linenos %}
.main-menu li {
  display: inline-block;
  margin-left: -4px;
}
{% endhighlight %}

#### Alternativ 2: Ändra storleken på whitepspace

— Förminska whitespace så den inte skapar marginal. Med den här metoden sätter vi font-storleken till 0 på hela `<ul>`-elementet och sedan tillbaka till tidigare värde på varje element. **Inte** en snygg lösning om du frågar mig, men det funkar.

{% highlight css linenos %}
.main-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0rem;
}

.main-menu li {
  display: inline-block;
  font-size: 1rem;
}
{% endhighlight %}

### Ta bort whitespace i semantiken

Vill du behålla läsbarheten i din markup utan att korrigera marginalen med CSS kan du använda HTML-kommentarer mellan varje `<li>`. Inte en så snygg lösning, men återigen... det funkar.

{% highlight html linenos %}
<ul class="main-menu">
  <li class="selected"><a href=".">Home</a></li><!--
  --><li><a href="about">About</a></li><!--
  --><li><a href="blog">Blog</a></li><!--
  --><li><a href="contact">Contact</a></li>
</ul>
{% endhighlight %}

På tal om en inte så snygg lösning. Här är ytterligare ett sätt men det kryper i kroppen när jag tänker på det. Vi flyttar helt enkelt ner avslutande vinkelparentes (&gt;) till nästa rad.

{% highlight html linenos %}
<ul class="main-menu">
  <li class="selected"><a href=".">Home</a></li
  ><li><a href="about">About</a></li
  ><li><a href="blog">Blog</a></li
  ><li><a href="contact">Contact</a></li>
</ul>
{% endhighlight %}

Här är en variant:

{% highlight html linenos %}
<ul class="main-menu">
  <li class="selected">
    <a href=".">Home</a></li><li>
    <a href="about">About</a></li><li>
    <a href="blog">Blog</a></li><li>
    <a href="contact">Contact</a></li>
</ul>
{% endhighlight %}

Det går även att skippa sluttaggen för listraden (`</li>`). Sidan kommer att renderas rätt men detta alternativ skulle jag inte rekomendera någon att använda.

## Att tänka på

Om du känner att just 4 pixlar känns bra mellan dina element kan du låta det vara. Problemet uppstår om t ex CSS-standarden helt plötsligt ändras och marginalen tas bort, eller om du minifierar din HTML. Då försvinner marginalen och din design blir inte som du tänkt dig.
