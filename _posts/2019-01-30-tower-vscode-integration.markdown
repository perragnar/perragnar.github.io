---
title: Integrera Visual Studio Code i Tower i Mac OS
date: 2019-01-30
layout: post
categories:
  - Utveckling
tags:
  - Visual Studio Code
  - Tower
  - Mac
poster: git-header.jpg
---

Använder du Git-klienten **Tower** och vill använda **Visual Studio Code** för att jämföra och slå ihop (diff och merge) commits?  
Det finns några verktyg att välja bland i Towers inställningar för att hantera merge och diff tools.

<figure>
  <img src="{{ site.baseurl }}/assets/postfiles/tower-diff-tools.png" alt="Tower diff tools" style="max-width: 300px;" loading="lazy">

  <img src="{{ site.baseurl }}/assets/postfiles/tower-merge-tools.png" alt="Tower merge tools" style="max-width: 300px;" loading="lazy">
</figure>

Som du ser ligger Visual Studio Code med längst ner i listan, _men_ inte förrän du gjort ett par saker.

Gå till katalogen 

```
~/Library/Application Support/com.fournova.Tower3/CompareTools/
```

Kör du version 2 så är sökvägen

```
~/Library/Application Support/com.fournova.Tower2/CompareTools/
```

Skapa en fil i katalogen som heter **code.sh** och lägg till följande innehåll;

```
#!/bin/sh

code --wait $4
```

Skapa därefter en fil som heter **CompareTools.plist** och lägg till följande;

```
?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
    "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>    
    <dict>
        <key>ApplicationIdentifier</key>
        <string>com.microsoft.VSCode</string>
        <key>ApplicationName</key>
        <string>Visual Studio Code</string>
        <key>DisplayName</key>
        <string>Visual Studio Code</string>
        <key>LaunchScript</key>
        <string>code.sh</string>
        <key>Identifier</key>
        <string>code</string>
        <key>SupportsMergeTool</key>
        <true/>
        <key>SupportsDiffChangeset</key>
        <false/>
    </dict>
</array>
</plist>
```

Du har nu gett Tower instruktioner om att Visual Studio Code finns tillgängligt för att hantera diff- och merge-operationer.

Efter att du startat om Tower kommer Visual Studio Code att finnas att välja som alternativ som diff- och merge tools.

Du kan också lägga till följande rader i din .gitconfig-fil;

```
[merge]
        tool = vscode
[mergetool "vscode"]
        cmd = code --wait $MERGED
```
