---
title: Git leaderboard
layout: post
seo-title: Git leaderboard
seo-description: Är du en tävlingsinriktad Gitanvändare? Ta ut en resultatlista på alla deltagande personer i rangordning efter antalet commits.
tags:
  - Git
categories:
  - Webbutveckling
poster: git-header.jpg
comments: true
excerpt: |
  Är du en tävlingsinriktad Gitanvändare? Ta ut en resultatlista på alla deltagande personer i rangordning efter antalet commits.
---

{% highlight bash %}
  git shortlog -sn
{% endhighlight %}

OK, man vinner inget pris för att göra flest commits till ett repo, men det kanske inspirerar till att jobba lite extra hårt under arbetsdagen... eller så leder det till att man istället gör många små commits.

{% highlight bash %}
  git clone https://github.com/facebook/react.git
  cd react/
  git shortlog -sn
{% endhighlight %}

Grattis Paul!

{% highlight plaintext %}
  1775  Paul O’Shannessy
  1183  Ben Alpert
   582  Sebastian Markbåge
   456  Jim Sproch
   377  Dan Abramov
   332  Pete Hunt
   261  Andrew Clark
   222  Cheng Lou
   207  Vjeux
   140  Ben Newman
   130  Jeff Morrison
   115  Thomas Aylott
   109  Timothy Yung
    77  Andreas Svensson
    68  Brian Vaughn
    65  Christoph Pojer
    45  Shim Won
    40  Brandon Dail
    39  Kohei TAKATA
    36  Toru Kobayashi
    ...
{% endhighlight %}
