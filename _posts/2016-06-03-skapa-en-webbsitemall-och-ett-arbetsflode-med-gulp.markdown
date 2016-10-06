---
title: Skapa en webbsitemall och ett arbetsflöde med Gulp
layout: post
categoreies:
  - Webbutveckling
tags:
  - Arbetsflode
  - Browsersync
  - Gulp
  - npm
  - Sass
  - Scss
poster: webdev.jpg
excerpt: |
  Med hjälp av Gulp och några paket är det ganska lätt att skapa ett arbetsflöde där innehållet automatiskt kompileras, minifieras, slås ihop, optimeras och kopieras till en mapp som du snabbt kan lägga ut på nätet.<br />
  Vi ska titta på hur man kompilerar Sass till CSS, minifierar CSS, Javascript och HTML, slår ihop CSS- och Javascriptfiler och hur man optimerar bilder.
draft: true
---
## — Vad betyder allt det där och hur kan det hjälpa mig?

![webdev-bot]({{ site.baseurl }}/assets/postfiles/webdev-bot.jpg)

Ta en titt på bilden nedan. Tänk dig att du har två mappar; `app` och `dist` där du i den första arbetar med dina filer och så fort du gör en ändring i någon fil sköter Gulp kompilering, minifiering osv i bakgrunden och skickar över de färdiga filerna till mappen `dist`. Inom ett ögonblick när allt är klart laddas sidan om automatiskt i din webbläsare.

![Gulpprocessen]({{ site.baseurl }}/assets/postfiles/basics.png)

## Installation av Node.js, npm och Gulp

### Node.js

![Node.js]({{ site.baseurl }}/assets/postfiles/node-js-logo.png)

Det första vi måste göra är att installera Node.js. Är du osäker på om du har det installerat kan du kontrollera det genom att i din prompt skriva `node -v` vilket kontrollerar vilken version du har. Om du har Node.js installerat returneras versionsnumret, annars får du ett felmeddelande att kommandot inte hittas.

Gå till [https://nodejs.org/en/download/](nodejs.org) och ladda ner installationsfilerna för din plattform och kör igång installationen.

### npm

![npm - Node Package Manager]({{ site.baseurl }}/assets/postfiles/Npm-logo.svg_.png)

[https://www.npmjs.com/](npmjs.com)

### Gulp

![Gulp]({{ site.baseurl }}/assets/postfiles/gulp-logo.png)

Lorem ipsum Commodo occaecat deserunt culpa Duis irure ut deserunt nisi laborum minim minim aute incididunt voluptate non velit pariatur irure nostrud non dolore eiusmod ullamco irure.

## Problem?

Jag har stött på problem med att Node.js inte fungerat i Windows 10 och då har jag behövt lägga till sökvägen `C:\Windows\System32` i PATH under Environment Variables.

## Browsersync

<iframe src="https://www.youtube.com/embed/Ig8kOytR-ek" width="1000" height="563" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## Varför Gulp och inte Grunt?

Jag har testat bägge och i slutändan tror jag de är likvärdiga. Personligen tycker jag att Gulp har jobbat snabbare men det kan vara en inställningssak.
