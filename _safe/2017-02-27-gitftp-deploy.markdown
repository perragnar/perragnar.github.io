---
title: GitFTP-Deploy
layout: post
seo-title: GitFTP-Deploy
seo-description: Använd GitFTP-Deploy för att smidigt ladda upp din kod.
tags:
  - GitFTP-Deploy
  - Git
  - Deploy
categories:
  - Webbutveckling
poster: gitftp-deploy.jpg
comments: true
excerpt: |
  Häromdagen dök det upp en intressant artikel i mitt nyhetsflöde om ett verktyg som lovar att automatiskt kolla en branch i ditt Git repository och synka de ändrade filerna via FTP.
  
  Programmet heter **GitFTP-Deploy** och är utvecklat av [eastwest.se](https://eastwest.se/apps/gitftpdeploy).
---



> **GitFTP-Deploy** – Dead simple Git to FTP-deployments for macOS

## Vi testar!

Låt oss göra ett exempel med en testserver och en skarp server. Tanken är att så fort vi commitat en ändring i develop-branchen så ska de berörda filerna synkas med vår testserver och samma sak för den skarpa servern som ska synkas med master-branchen.

### Lägg upp site

Börja med att lägga upp en ny site i GitFTP-Deploy. Detta ska bli vår testserver. I första fliken, som heter **repository** anger vi ett namn på siten och var repositoryt ligger. Vi anger **Test server** som namn och pekar ut mappen där projektet ligger. När ett repository hittats listas alla brancher i listan, så vi väljer **develop** i listan.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/01.jpg" alt="Ny site - Repository." class="downscale" />
  <figcaption>Ny site - Repository.</figcaption>
</figure>

I fliken **Server** anger vi adressen till FTP-servern samt inloggningsuppgifter. Här finns det ett val om filer automatiskt ska synkas över FTP så fort en ändring görs.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/02.jpg" alt="Ny site - Server." class="downscale" />
  <figcaption>Ny site - Server.</figcaption>
</figure>

Nu har vi lagt till vår testserver. De återstående flikarna kommer jag inte att gå närmare in på men där går det att innan filer skickas köra script, samt att hantera regler för filer.

Det som händer nu är att alla filer som berörs av den senaste commiten listas.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/03.jpg" alt="Filer berörda av commiten listas." />
  <figcaption>Filer berörda av commiten listas.</figcaption>
</figure>

I detta läge är det bara att trycka på knappen **Deploy!** i övre högra hörnet så skickas filerna upp till servern. Klickade du i valet **Auto-deploy on commit** i fliken **Server** görs detta automatiskt.

OK, nu gör vi samma sak gör vår skarpa server som vi kallar **Live server**.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/04.jpg" alt="Ny site - Live server." />
  <figcaption>Ny site - Live server.</figcaption>
</figure>

Samma sak sker även här, alla berörda filer listas och det är bara att klicka **Deploy!** för att skicka upp.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/05.jpg" alt="Filer berörda av commiten listas." />
  <figcaption>Filer berörda av commiten listas.</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/06.jpg" alt="Klicka på Deploy! och filerna skickas upp." />
  <figcaption>Klicka på Deploy! och filerna skickas upp.</figcaption>
</figure>

Vi dubbelkollar att allt ser OK ut på servern...

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/07.jpg" alt="Alla filer uppladdade till servern." />
  <figcaption>Alla filer uppladdade till servern. Bilden visar programmet Transmit från <a href="https://panic.com">Panic</a>.</figcaption>
</figure>

### Ändringar

Nu testar vi själva automatiseringen. Vi lägger till en fil och commitar den, i detta exempel för enkelhetens skull direkt i master-branchen. Detta ska naturligtvis göras i develop-branchen och testas!

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/08.jpg" alt="Ny fil." />
  <figcaption>Ny fil.</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/09.jpg" alt="Filen commitas." />
  <figcaption>Filen commitas.</figcaption>
</figure>

Nu dyker filen upp i GitFTP-Deploy med status **A**, dvs det är en ny fil.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/10.jpg" alt="Filer berörda av commiten listas." />
  <figcaption>Filer berörda av commiten listas.</figcaption>
</figure>

Vi klickar på **Deploy!** och filen hamnar på servern. Åter igen; om valet **Auto-deploy on commit** är gjort i inställningarna för siten kommer detta steg att göras automatiskt.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/11.jpg" alt="Filen är synkad med servern." />
  <figcaption>Filen är synkad med servern.</figcaption>
</figure>

– Vad händer om en fil raderas, tas den även bort på servern?  
Vi testar att radera filen **new-file.md** och klickar på **Deploy!**.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/12.jpg" alt="Ändringen listas." />
  <figcaption>Ändringen listas.</figcaption>
</figure>

Filen är nu borta från servern.

<figure>
  <img src="{{ site.root }}/assets/postfiles/gitftp-deploy/07.jpg" alt="Filen är synkad med servern." />
  <figcaption>Filen är synkad med servern.</figcaption>
</figure>

### Slutord

Kul idé och praktiskt program. **GitFTP-Deploy** kan definitivt underlätta ditt arbete om det passar dig och din utveklingsmiljö och framförallt resten av ditt team.

Läs mer om GitFTP-Deploy på [css-tricks.com](https://css-tricks.com/gitftp-deploy/).

_Denna artikel är **inte** sponsrad av eastwest.se eller någon annan._
