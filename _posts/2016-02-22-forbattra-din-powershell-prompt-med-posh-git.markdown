---
title: Förbättra din PowerShell-prompt med Posh-Git
layout: post
categories:
  - Webbutveckling
tags:
  - Git
  - Posh-Git
  - Powershell
poster: git-header.jpg
excerpt: |
  Här kommer ett tips för att förenkla ditt arbetsflöde. Ge din PowerShell-prompt superkrafter med Posh-Git. Den ger inte bara en visuell feedback på din Git-status utan ger dig också förslag på Git-kommandon, Branch-namn mm.
---
## Vad gör Posh-Git?

Posh-Git lägger till en visuell feedback i din PowerShell-prompt som visar Git-status i ditt Git repository. Posh-Git lägger även till funktionalitet och hjälpmedel för att det ska bli lättare att använda prompten.

<!--more-->

Så här ser min PowerShell prompt ut (körs genom [ConEmu](https://conemu.github.io/)). Inga krusiduller, inga features.

![default-conemu-powershell-prompt]({{ site.baseurl }}/assets/postfiles/default-conemu-powershell-prompt.jpg)

Så här ser prompten ut med Posh-Git och en mindre modifiering av sökvägen. Prompten visar att två filer är tillagda och utropstecknet säger att filer finns som inte är trackade i repositoryt. Se nedan under rubriken __Vad visar Git-statusen i prompten?__.

![posh-git-conemu-powershell-prompt]({{ site.baseurl }}/assets/postfiles/posh-git-conemu-powershell-prompt.jpg)

Feature: Tab för att byta branch:

![posh-git-prompt-tab]({{ site.baseurl }}/assets/postfiles/posh-git-prompt-tab.gif)

Här är en kort video på hur prompten ändras beroende på Git-statusen. I videon använder jag Sublime Text med tillägget [GitSavvy](https://github.com/divmain/GitSavvy) samt PowerShell genom [ConEmu](https://conemu.github.io/).

<iframe width="960" height="540" src="https://www.youtube.com/embed/Sbv-ZjL6TD8?rel=0" frameborder="0" allowfullscreen></iframe>

## Vad visar Git-statusen i prompten?

Saxat från Posh-Git readme.md:

* `+` = Added files
* `~` = Modified files
* `-` = Removed files
* `!` = Conflicted files

## Installera

Du kan följa instruktionerna på Posh-Gits hemsida eller så kan du ta den enkla vägen och installera genom något som heter [PsGet](http://psget.net). Öppna PowerShell, skriv eller klistra in följande och kör det:

{% highlight powershell linenos %}
(new-object Net.WebClient).DownloadString("http://psget.net/GetPsGet.ps1") | iex
{% endhighlight %}

Du bör får en feedback på att PsGet är installerat. Nu behöver du bara köra följande rad för att installera Posh-Git:

```
install-module posh-git
```

## Konfigurera

När du installerat Posh-Git måste du starta om PowerShell alternativt att ladda om profilen för att ändringarna ska visas.
Profilen ligger (i mitt fall) i:
{% highlight plaintext linenos %}
~\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
{% endhighlight %}

... och den laddar i sin tur in en profil som ligger i

{% highlight plaintext linenos %}
~\Documents\WindowsPowerShell\Modules\posh-git\profile.example.ps1
{% endhighlight %}

I __profile.example.ps1__ bestäms hur prompten ska se ut i funktionen __global:prompt__.

Personligen tyckte jag inte att hela sökvägen behövde synas i prompten då det kan ta upp mycket plats. Det räcker med att visa vilken katalog man befinner sig i just nu.
Så här ser min konfiguration ut:

{% highlight powershell linenos %}
# Set up a simple prompt, adding the git prompt parts inside git repos
function global:prompt {
  $cdelim = [ConsoleColor]::DarkCyan
  $chost = [ConsoleColor]::Green
  $cloc = [ConsoleColor]::blue

  write-host '' -n -f $cdelim
  write-host (split-path (pwd) -Leaf) -n -f $cloc
  write-host '' -n -f $cdelim

  Write-VcsStatus

  $global:LASTEXITCODE = $realLASTEXITCODE
    return " > "
}
{% endhighlight %}

### Övrigt

Läs mer om [Posh-Git](https://github.com/dahlbyk/posh-git).
