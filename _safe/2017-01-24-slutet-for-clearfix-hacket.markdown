---
title: Slutet för clearfix-hacket?
layout: post
seo-title: Är flow-root slutet för clearfix-hacket?
seo-description: Nu kommer en ny display-metod med inbyggd clear som kommer att ersätta det vanliga clearfix-hacket.
tags:
  - clearfix
  - CSS
categories:
  - Webbutveckling
poster: css-header.jpg
comments: true
excerpt: |
  Nu kommer en ny display-metod med inbyggd clear som kommer att ersätta det vanliga clearfix-hacket.
---

## Vad är ett clearfix-hack och vad används det till?

Det har funnits en rad olika clearfix-hack genom åren men alla gör samma sak; att förhindra att element flyter utanför sin container. Jag ska visa ett exempel på när ett clearfix är användbart.

Vi har en container, dvs en `<div>` med CSS-klassen **container**. I container har vi t ex en bild eller vilket element som helst som flyter till vänster om text med hjälp av `float: left;`. Det som händer är att eftersom bilden flyter tar den inte hänsyn till containerns höjd och flyter därför utanför.

![Utan clearfix](/assets/postfiles/clear-fix-1.jpg)

Använder vi oss av ett clearfix-hack i containern blir resultatet följande:

![Med clearfix](/assets/postfiles/clear-fix-2.jpg)

## Clearfix CSS

Här är ett exempel på hur ett clearfix-hack kan se ut:

{% highlight css linenos %}
.container:before,
.container:after {
  content: '';
  display: table;
}

.container:after {
  clear: both;
}
{% endhighlight %}

Eller som här i ett SCSS mixin:

{% highlight scss linenos %}
@mixin clearfix {
  &:before,
  &:after {
    content: '';
    display: table;
  }
  &:after {
    clear: both;
  }
}
{% endhighlight %}

## display: flow-root;

Nu verkar det som att det är på gång att släppas en ny metod att hanskas med detta problem och det är en CSS property som heter `display: flow-root;`. Väldigt förenklat kan man säga att den fungerar som `display: block;` men har en inbyggd clearfix.

Än så länge finns detta dock bara i betaversioner av Firefox och Chrome.

{% highlight css linenos %}
.container {
  display: flow-root;
}
{% endhighlight %}
