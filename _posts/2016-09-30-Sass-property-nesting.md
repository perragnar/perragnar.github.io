---
layout: post
title: Sass property nesting
tags:
  - sass
  - scss
  - property nesting
category: Webbutveckling
poster: sass-poster.jpg
comments: true
excerpt: |
  Utnyttjar du Sass "property nesting"?
---
Det finns många bra saker med Sass och "property nesting" är en av dem.

Här kommer en liten påminnelse om du glömt använda det (förutsatt att du ens använder Sass).

{% highlight scss linenos %}
p {
  margin: {
    top: 2rem;
    right: 5rem;
  }

  font: {
    size: 2rem;
    weight: 700;
  }
}
{% endhighlight %}
