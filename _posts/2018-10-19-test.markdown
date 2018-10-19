---
title: Gremlins för Visual Studio Code
layout: post
categories:
  - Utveckling
tags:
  - Visual Studio Code
  - vscode
  - Gremlins
---

Vill tipsa om en ganska liten och enkel extension till Visual Studio Code. Det enda den gör är att markera, både rad och vilken position, "felaktiga" tecken. 

När jag programmerar så kommer jag ganska ofta åt någon tangentbordskombination som av misstag lägger till tecken som kommer att bryta exekveringen av koden. Med hjälp av *Gremlins* ser jag direkt det smyger in otillåtna tecken.

> This Visual Studio Code extension reveals some characters that can be harmful because they are invisible or looking like legitimate ones. <cite>Nicolas Hoizey, utvecklare av Gremlins</cite>

- When there is a zero-width space in the code, the extension shows a red bar
- A few characters that can be harmful have a light red or orange background
  - Non-breaking spaces
  - Left and right double quotation marks
- Move the cursor over the character to have a hint of the potential issue
- A gremlin icon is shown in the gutter for every line that contains at least one of these characters

[Installera Gremlins](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)
