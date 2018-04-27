---
title: Få Git att komma ihåg ditt lösenord
seo-title: Få Git att komma ihåg ditt lösenord
seo-description: |
 Hur du får Git att komma ihåg ditt lösenord till remote repository
layout: post
tags:
  - Git
  - Lösenord
categories:
  - Webbutveckling
poster: git-header.jpg
comments: true
excerpt: |
  Vill du slippa skriva in ditt lösenord till ditt remote repository varje gång du kör dina git-kommandon?
---

Genom att skriva följande i prompten kan du få Git att minnas det senaste lösenord du angett i det aktuella repositoryt:

{% highlight plaintext linenos %}
git config credential.helper store
{% endhighlight %}

Första gången efter du aktiverat det måste du ange inloggningsuppgifter dock.

![You're welcome!']({{ site.baseurl }}/assets/postfiles/yourewelcome.gif)

Källa: [git-scm.com](https://git-scm.com/docs/git-credential-store)

