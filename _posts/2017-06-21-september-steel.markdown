---
title: September Steel - Ett tema till Visual Studio Code
layout: post
seo-title: September Steel - Ett tema till Visual Studio Code
seo-description: September Steel är ett mörkt tema till Visual Studio Code baserat på One Monokai Theme av Joshua Azemoh.
tags: 
  - Visual Studio Code
  - vscode
  - September Steel
categories:
  - Webbutveckling
poster: september-steel-vscode.png
comments: true
excerpt: |
  För ungefär tusen år sedan utvecklade jag ett diskussionsforum i ASP (vanilla ASP!) som faktiskt användes flitigt i många år av några idéella organisationer och av andra som ville ha en enkel forumplattform i ASP och Accessdatabas. Utöver standardtemat som följde med gjorde jag ett tema som hette September Steel med en gråblå ton. Nu återlivar jag temat i Visual Studio Code med temat One Monokai Theme som grund.
---

## Skärmdumpar

<figure>
  <img src="{{ site.root }}/assets/postfiles/september-steel/screenshot-html-js.png" alt="HTML + Sass" />
  <figcaption>HTML + Sass</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/september-steel/screenshot-markdown.png" alt="Markdown" />
  <figcaption>Markdown</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/september-steel/screenshot-source-control.png" alt="Source Control" />
  <figcaption>Source Control</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/september-steel/screenshot-detail-icons.png" alt="Ikon" />
  <figcaption>Ikon</figcaption>
</figure>

<figure>
  <img src="{{ site.root }}/assets/postfiles/september-steel/screenshot-detail-settings.png" alt="Inställningar" />
  <figcaption>Inställningar</figcaption>
</figure>

## Installera

[Direktlänk till September Steel](https://marketplace.visualstudio.com/items?itemName=perragnaredin.september-steel) på [Visual Studio Marketplace](https://marketplace.visualstudio.com).

### Alternativ installation

- Gå till [Visual Studio Marketplace](https://marketplace.visualstudio.com/) och sök efter **September Steel**.
- Öppna **Extensions** i Visual Studio Code och sök efter **September Steel**.
- Öppna _Quick Open_ (<kbd>Cmd</kbd> + <kbd>P</kbd>) och skriv `ext install september-steel`.

## Rekomenderade inställningar

{% highlight json linenos %}
{
  "window.openFilesInNewWindow": "off",
  "window.newWindowDimensions": "inherit",
  "editor.fontSize": 16,
  "editor.lineHeight": 30,
  "editor.snippetSuggestions": "top"
}
{% endhighlight %}

## Mina inställningar och plugins jag använder

- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) &rarr; Formatterar HTML, Javascript och CSS.
- [Blank Line at the End of File](/marketplace.visualstudio.com/items?itemName=riccardoNovaglia.missinglineendoffile) &rarr; Lägger till en tom rad i filer när filen sparas ([Varför?]).(https://stackoverflow.com/questions/2287967/why-is-it-recommended-to-have-empty-line-in-the-end-of-file))
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) &rarr; Lägger till bokmärken för filer/rader och markerar rader med en symbol.
- [Color Picker](https://marketplace.visualstudio.com/items?itemName=anseki.vscode-color) &rarr; En färgpalett. Inte jättesnabb men användbar. (Code kommer att få en native color picker i kommander versioner.)
- [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) &rarr; Döp om, radera, flytta filer mm med enkla kommandon.
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) &rarr; Ikontema till filvyn.
- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) &rarr; Hantera projekt enkelt.
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) &rarr; Synka dina inställningar mot Github. Bra som backup av inställningarna eller om du vill ha samma inställningar på flera maskiner.
- [Text Pastry](https://marketplace.visualstudio.com/items?itemName=jkjustjoshing.vscode-text-pastry) &rarr; Lite finesser för att klistra in t ex inkrementerade tal med multiple cursors.
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) &rarr; Markerar kommentarer `TODO:` och `FIXME:` så att de blir lättare att hitta igen i koden. Kan även sammanställa alla **TODO** och **FIXME** i ditt projekt i en lista med hänvisning till fil och radnummer.

{% highlight json linenos %}
{
  "editor.fontSize": 16,
  "editor.lineHeight": 30,
  "editor.tabSize": 4,
  "editor.wordWrap": "on",
  "editor.fontLigatures": true,
  "editor.snippetSuggestions": "top",
  "editor.minimap.enabled": true,
  "editor.minimap.renderCharacters": false,
  "editor.cursorBlinking": "phase",
  "editor.cursorStyle": "block",
  "editor.renderLineHighlight": "none",
  "editor.renderIndentGuides": true,
  "editor.renderControlCharacters": true,
  "editor.showFoldingControls": "mouseover",
  "window.zoomLevel": 1,
  "workbench.sideBar.location": "left",
  "explorer.openEditors.visible": 0,
  "workbench.editor.showTabs": true,
  "explorer.autoReveal": false,
  "workbench.iconTheme": "material-icon-theme",
  "window.openFilesInNewWindow": "off",
  "workbench.welcome.enabled": false,
  "window.title": "🗄 ${rootPath} 🗳 ${activeEditorShort}${separator}${dirty}",
  "window.newWindowDimensions": "inherit",
  "extensions.autoUpdate": true,
  "emmet.useNewEmmet": true,
  "emmet.showExpandedAbbreviation": true,
  "zenMode.hideTabs": true,
  "diffEditor.ignoreTrimWhitespace": true,
  "git.confirmSync": false,
  "terminal.integrated.fontSize": 14,
  "terminal.external.osxExec": "iTerm.app",
  "workbench.colorTheme": "September Steel"
}
{% endhighlight %}
