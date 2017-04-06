---
title: 'The Git and how to swing it - Del 1: Installation och konfiguration'
seo-title: 'The Git and how to swing it - Del 1: Installation och konfiguration'
seo-description: Lär dig använda Git. Från en nybörjare till dig som nybörjare. Vi inleder med att installera och konfigurera Git.
layout: post
categories:
  - Webbutveckling
tags:
  - Git
  - Nybörjare
poster: git-header.jpg
excerpt: |
  Lär dig använda Git. Från en nybörjare till dig som nybörjare.
  Vi inleder med att installera och konfigurera Git.
published: false
---
Med följande tanke i huvudet börjar jag skriva ner den första meningen i den här artikeln...

> Man lär sig bäst när man lär ut till andra.

<!--more-->

![Git logo]({{ site.baseurl }}/assets/postfiles/git-logo.png)

### Använder du git och är nybörjare eller funderar du på att börja?
__Innan du läser vidare__ är det viktigt att du vet om att det här är en artikel skriven av en nybörjare med andra nybörjare som målgrupp.
Jag själv har använt git (sparsamt) under bara ett par år men på senare tid har jag sett styrkan med Git och då väcks viljan att vilja lära och förstå.

### Vad är Git?
> Git is a distributed revision control system with an emphasis on speed, data integrity, and support for distributed, non-linear workflows. Git was initially designed and developed by Linus Torvalds for Linux kernel development in 2005, and has since become the most widely adopted version control system for software development.
> ~ [Wikipedia](http://en.wikipedia.org/wiki/Git_%28software%29)

Jag ska inte gå mer in på detta eftersom målet med artikeln är att nå ut till dem som redan vet vad det är men behöver tips och hjälp med att komma igång att använda Git.

En liten rolig sak om namnet _Git_ bara:

> Torvalds has quipped about the name git, which is British English slang meaning "unpleasant person".
> Torvalds said: "I'm an egotistical bastard, and I name all my projects after myself.

### Lite kort om min bakgrund med Git
När jag började lära mig och sätta mig in i Git hade jag som mål att försöka undvika hjälpmedel som gör jobbet åt mig, dvs exempelvis Git-klienter med funktioner som kör Git-kommandon i bakgrunden. [SourceTree][sourcetree] hade jag installerat om jag skulle köra fast, och jösses vad jag körde fast! Men jag var envis och försökte i första hand att lösa problemen i terminalen och om det inte löste sig gick jag över till SourceTree.
Idag använder jag _Git Bash_, _Microsoft PowerShell_ och i min texteditor Sublime Text 3 ett plugin som heter _[GitSavvy](https://github.com/divmain/GitSavvy)_.

Nog om mig...

### Installera Git
Att installera Git är väldigt enkelt. Gå till [git-scm.com][git-download] och ladda ner git till ditt operativsystem. Jag har under tiden jag använt git använt mig av både Mac OS och Windows och förfarandet är i stort sett lika i bägge miljöerna.

#### Dags för en test
Dags att testa om det fungerar, så börja med att öppna valfritt terminalprogram. I prompten kav du testa om Git är installerat genom att helt enkelt bara skriva;

    git

Om installationen lyckats borde något i den här stilen visas:

{% highlight plaintext linenos %}
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
{% endhighlight %}


Som framgår av paletten av kommandon som presenteras kan man skriva `git --version` för att visa vilken version som är installerad. Så här kan det se ut;

{% highlight plaintext linenos %}
git version 1.9.5.msysgit.1
{% endhighlight %}

### Din Git-identitet
En sak som man bör göra innan man sätter igång att jobba är att lägga till en identitet för att märka dina _commits_. Det som behövs är namn och en e-postadress.

För att lägga in dessa uppgifter skriver du;

{% highlight plaintext linenos %}
git config --global user.name "John Doe"
git config --global user.email "john@doe.com"
{% endhighlight %}

_Självklart byter du ut John Doe mot ditt namn och samma för e-postadressen._

Så här kan det se ut i loggen när en person har lagt upp en ändring:

{% highlight plaintext linenos %}
- commit 6d4aef864a59ec292de4de0e1142e5ecdf08de30
Author: John Doe <john@doe.com>
Date:   Fri Mar 27 09:16:38 2015 +0100
{% endhighlight %}

Vill du se vad som är inställt kan man lista alla eller enskilda parametrar i Gits konfiguration. För att lista __alla__ parametrar skriver du:

{% highlight plaintext linenos %}
git config -l
{% endhighlight %}

och för __enskilda__ parametrar;

{% highlight plaintext linenos %}
git config --get [parameter]
{% endhighlight %}

där `[parameter]` ersätts med den parameter du vill visa. Som exempel kan vi visa de parametrar vi har lagt in redan, dvs _namn_ och _e-postadress_.

{% highlight plaintext linenos %}
git config --get user.name
git config --get user.email
{% endhighlight %}

### Konfigurera terminalen
Om du planerar på att använda terminalen kan det vara en bra idé att aktivera färger i git.

{% highlight plaintext linenos %}
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
{% endhighlight %}

\[TODO: Skärmdump på terminalen med färger.\]

### Git-klienter
Vill du inte dyka ner i terminaler och promptar så tycker jag att du ska hämta en Git-klient.

### Git på svenska
En sak som jag har svårt med är att förklara Git på svenska. Oftast blir det en svengelsk variant i stil med "&dash; Har du pushat upp din senaste commit?"

Jag hittade denna sida på github.com om hur fel det kan låta med Git på svenska. [Bjorne](https://github.com/bjorne/) som gjort sidan har förslag på en svensk Git-parlör:
[Git på svenska](https://github.com/bjorne/git-pa-svenska).

> &dash; Kan du rycka grenen jag just ympade och trycka till github?
> &dash; Skicka en ryckbegäran när du är färdig med sammanfogningen!
> &dash; Låt oss plocka russin från mäster-grenen.

| Verb        | Nuvarande bruk | Förslag       |
|-------------|----------------|---------------|
| pull        | pulla          | rycka         |
| push        | pusha          | trycka        |
| fetch       | fetcha         | hämta         |
| branch      | brancha        | förgrena      |
| commit      | commita        | förbinda      |
| rebase      | rebasa         | ympa          |
| merge       | merga          | sammanfoga    |
| stash       | stasha         | gömma         |
| tag         | tagga          | märka         |
| cherry-pick | cherry-picka   | plocka russin |
| amend       | amenda         | rätta till    |

| Substantiv   | Nuvarande bruk | Förslag     |
|--------------|----------------|-------------|
| git          | git            | jävel       |
| repository   | repo           | förvaring   |
| branch       | branch         | gren        |
| commit       | commit         | förbindelse |
| pull request | pull request   | ryckbegäran |
| stash        | stash          | gömma       |
| tag          | tagg           | märke       |

### Nyttiga länkar
- [git-scm.com][git-scm]
- [Ladda ner git][git-download]
- [SourceTree][sourcetree] - en Git-klient
- [iTerm2][iterm] till Mac OS

### Avslutande ord
Då har vi kommit igång med Git. Nästa del kommer att handla om att skapa ett Git repository och att...

### — The git and how to swing it!?
"The git and how to swing it" är en referens till Tom Jones album "The lead and how to swing it". Don't ask.

[git-scm]: http://git-scm.com
[git-download]: http://git-scm.com/downloads
[sourcetree]: https://www.atlassian.com/software/sourcetree/overview
[iterm]: http://iterm2.com/
