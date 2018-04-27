---
title: Git autocorrect
seo-title: Git autocorrect
seo-description: Stavar du ofta fel när du skriver? Då kan du tala om för Git att du behöver lite hjälp på traven med autorättning.
layout: post
categories: 
  - Webbutveckling
tags:
  - Autocorrect
  - Git
poster: git-header.jpg
excerpt: |
  Stavar du ofta fel när du skriver? Då kan du tala om för Git att du behöver lite hjälp på traven med autorättning.
---
Ibland [skriver man slarvigt](https://en.wikipedia.org/wiki/Fat-finger_error). Du skriver `git fetcg` eller `git pusg` när du i själva verket menade `git fetch` och `git push`.
Genom att skriva följande kan du få git att acceptera lite felstavningar så förutsätter Git att du menade något annat (förhoppningsvis ett snarlikt kommando) och väljer det istället.

{% highlight plaintext linenos %}
git config --global help.autocorrect 1
{% endhighlight %}

Skriver du `git statsu` händer följande:

{% highlight plaintext linenos %}
git statsu
WARNING: You called a Git command named 'statsu', which does not exist.
Continuing under the assumption that you meant 'status'
in 0.1 seconds automatically...
{% endhighlight %}
