---
title: Återställ ändrade filer i Git
layout: post
categories:
  - Webbutveckling
tags:
  - checkout
  - git
poster: git-header.jpg
excerpt: |
  Ibland händer det att jag har ändrat i en eller flera filer och kommer på att jag vill återgå till originalet, eller rättare sagt till den senaste "commiten". Här ska jag visa hur man återställer filer(na) med Git.
---

I denna artikel lägger jag nivån ganska lågt eftersom den är riktad mot nybörjare.

## När är detta användbart?

Det finns olika scenarion där man behöver ångra sina ändrade filer och jag ska visa två exempel;

- I det ena exemplet ska vi återställa sk "dirty state files", dvs ändrade filer som *inte* är commitade.
- I det andra exemplet ska vi återställa filer som är commitade.

### Exempel 1: "Dirty state files"

Vi har filerna `index.html` och `main.css` och till att börja med ändrar vi lite i CSS-filen.
Jag tar bort raden med bakgrundsfärgen och sparar.

![Ändrad CSS-fil]({{ site.baseurl }}/assets\git-aterstall-git-discard-css-change-1.png)

Så här ser `git status` ut efter ändringen.

![Git status för ändrad CSS-fil]({{ site.baseurl }}/assets\git-aterstall-git-discard-css-change-2.png)

Om jag vill ångra mig och återställa filen main.css kan jag enkelt använda kommandot `git checkout -- <file>` där `--` innebär att checkout hämtar datat i *HEAD*.

> HEAD is a ref (reference) to the currently checked out commit. In normal states, it's actually a symbolic ref to the branch you have checked out - if you look at the contents of .git/HEAD you'll see something like "ref: refs/heads/master". The branch itself is a reference to the commit at the tip of the branch.

{% highlight plaintext linenos %}
git checkout -- main.css
{% endhighlight %}

Nu är filen main.css återställd och bakgrundsfärgen är tillbaka.

Det går även bra att återställa flera filer åt gången och då är syntaxen `git checkout -- <file1> <file2>` alternativt `git checkout -- .` för att återställa alla ändrade filer.

### Exempel 2: Återställa commitade filer

I det andra exemplet ska vi återställa två filer som är ändrade och commitade. Vi börjar med att göra ändringar i bägge filerna.
Jag ändrar i rubriken `<h1>` i filen index.html och tar återigen bort bakgrundsfärgen i main.css. Då får vi följande `git status`:

![Git status för ändrade filer]({{ site.baseurl }}/assets\git-aterstall-git-discard-files-change-1.png)

Kommandot `git diff` visar vad som är ändrat i filerna (grönt för ändrade rader och rött för raderade rader). I bilden nedan kör jag kommandot git diff i Sublime Text via pluginet [Gitsavvy](https://github.com/divmain/GitSavvy) för att få en tydligare bild av vad som är ändrat.

![Git diff på ändrade filer]({{ site.baseurl }}/assets\git-aterstall-git-discard-files-change-2.png)

Nu ska vi commita våra ändringar och det gör vi genom att först lägga till filerna till *staging index*

{% highlight plaintext linenos %}
git add index.html main.css
{% endhighlight %}

alternativt

{% highlight plaintext linenos %}
git add .
{% endhighlight %}

för att lägga till alla ändrade filer.
Sedan ska vi commita filerna och lägga till en kommentar.

{% highlight plaintext linenos %}
git commit -m "Ändrade rubriken <H1> i index.html och tog bort bakgrundsfärgen i main.css"
{% endhighlight %}

Om vi nu kör `git status` visar den att working directory är "clean". Vi har inte längre "dirty state files".
Kör vi `git log` visar den att vår commit är registrerad. Den nedre posten i loggen visar den första commiten som gjordes och den övre den commit vi precis gjorde.

![Git log]({{ site.baseurl }}/assets\git-aterstall-git-discard-files-change-3.png)

Nu ska vi ångra den senaste commiten och återställa filerna med hjälp av `git reset`. Observera att det finns olika sätt att göra en reset på (--soft, --hard och --mixed) och i vårt fall ska vi använda `git reset --hard`. Innan du gör en reset i dina riktiga projekt bör du [läsa på](http://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard) vad de olika sätten gör med dina filer.

Vi ska alltså återgå till en tidigare commit. Varje commit har en sk "commit hash" som är unik och vi måste veta vilken hash den commit vi vill återgå har. Börja med att visa loggen igen genom att skriva `git log`. Den commit vi ska återgå till är den första i loggen vilken ligger längst ner.

![Git log]({{ site.baseurl }}/assets\git-aterstall-git-discard-files-change-4.png)

Hashen är den långa sträng längst upp;
{% highlight plaintext linenos %}
7dd4586911202c8b3b188c4f4502288f8d04519c
{% endhighlight %}

Nu när vi vet hashen kan vi återgå till den commiten genom att ange den tillsammans med `git reset`. Det går utmärkt att ta bara de första tecknen i hashen istället för hela, i vårt fall 7dd4586.

{% highlight plaintext linenos %}
git reset --hard 7dd4586911202c8b3b188c4f4502288f8d04519c
{% endhighlight %}

Direkt får vi responsen från Git att vi befinner oss på rätt commit:

{% highlight plaintext linenos %}
HEAD is now at 7dd4586 Initial commit
{% endhighlight %}

Nu har vi backat till den första commiten och raderat allt efter den gjordes och våra ändringar är återställda.
I vårt fall är det dock ingen fara eftersom vi vill ta bort alla ändringar och återgå till ursprungsläget.

En `git log` bekräftar nu att vår senaste commit är borta.

Som jag nämde ovan är det riskabelt att använda `git reset --hard` och många har nog förlorat många jobbtimmar pga det. Återigen, [läs på om git reset](http://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard) innan du använder det i ditt projekt.

*Lycka till!*
