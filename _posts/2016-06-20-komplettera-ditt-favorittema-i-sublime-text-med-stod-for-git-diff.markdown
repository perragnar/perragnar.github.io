---
title: Komplettera ditt favorittema i Sublime Text med stöd för Git diff
seo-title: Komplettera ditt favorittema i Sublime Text med stöd för Git diff
seo-description: Saknar ditt favorittema i Sublime Text stöd för färgmarkering i Gitt Diff? Det är lätt att fixa!
layout: post
categories:
  - Webbutveckling
tags:
  - Tema
  - Git
  - Sublime Text
poster: sublime-header.jpg
excerpt: |
  Saknar ditt favorittema i Sublime Text stöd för färgmarkering i Gitt Diff? Det är lätt att fixa!
---

Det fina med teman (eller rättare sagt färgscheman) i Sublime Text är att det är lätt att ändra det man inte tycker om och lätt att lägga till det man tycker saknas. Detta inom ramen för vad Sublime Text stöder för tillfället såklart.

Det finns fyra saker du kan lägga till för att stöda Git diff. Jag har valt att visa **diff.header** med en ljusare bakgrundsfärg än temats, raderade rader med rött, ändrade med gult och tillagda rader med grönt.

_I exemplet använder jag färgschemat [Energy](https://packagecontrol.io/packages/Energy%20Color%20Scheme) av [sandralundgren](https://packagecontrol.io/browse/authors/sandralundgren)._

### Git diff utan stöd i färgschemat

![Sublime Text tema utan stöd för Git diff]({{ site.baseurl }}/assets/postfiles/sublime-theme-diff-diff-1.png)

### Git diff med stöd i färgschemat

![Sublime Text tema med stöd för Git diff]({{ site.baseurl }}/assets/postfiles/sublime-theme-diff-diff-2.png)

## diff.header

Headern visar information om just det segmentet som är aktuellt i den Git diff du hanterar. Se bilden nedan var headers för varje segment visas.

![Segment, sk hunks]({{ site.baseurl }}/assets/postfiles/sublime-theme-diff-diff-header.png)

{% highlight xml linenos %}
<dict>
  <key>name</key>
  <string>diff.header</string>
  <key>scope</key>
  <string>meta.diff, meta.diff.header</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#2a2b26</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
{% endhighlight %}

## diff.deleted

Här markeras rader som är raderade.

{% highlight xml linenos %}
<dict>
  <key>name</key>
  <string>diff.deleted</string>
  <key>scope</key>
  <string>markup.deleted</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#ee3a43</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
{% endhighlight %}

## diff.changed

Här visas ändrade rader.

{% highlight xml linenos %}
<dict>
  <key>name</key>
  <string>diff.changed</string>
  <key>scope</key>
  <string>markup.changed</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#806F00</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
{% endhighlight %}

## diff.inserted

Här visas tillagda rader.

{% highlight xml linenos %}
<dict>
  <key>name</key>
  <string>diff.inserted</string>
  <key>scope</key>
  <string>markup.inserted</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#154F00</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
{% endhighlight %}

## För fullt stöd av diff

Lägg till detta någonstans i ditt färgschema inom `<array>` om du vill lägga till alla fyra.

{% highlight xml linenos %}
<dict>
  <key>name</key>
  <string>diff.header</string>
  <key>scope</key>
  <string>meta.diff, meta.diff.header</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#2a2b26</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
<dict>
  <key>name</key>
  <string>diff.deleted</string>
  <key>scope</key>
  <string>markup.deleted</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#ee3a43</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
<dict>
  <key>name</key>
  <string>diff.changed</string>
  <key>scope</key>
  <string>markup.changed</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#806F00</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
<dict>
  <key>name</key>
  <string>diff.inserted</string>
  <key>scope</key>
  <string>markup.inserted</string>
  <key>settings</key>
  <dict>
    <key>background</key>
    <string>#154F00</string>
    <key>foreground</key>
    <string>#F8F8F8</string>
  </dict>
</dict>
{% endhighlight %}
