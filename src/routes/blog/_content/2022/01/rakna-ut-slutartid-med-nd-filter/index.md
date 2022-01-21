---
title: Räkna ut slutartid med ND-filter
date: 2022-01-13
slug: rakna-ut-slutartid-med-nd-filter
path: /content/2022/01/rakna-ut-slutartid-med-nd-filter
showGallery: false
heroImage: /images/hero/camera-theory.jpg
thumbnail: /images/hero/camera-theory.jpg
categories: Fototeori
tags: [Filter, Verktyg]
---

<script>
  import ContentContainer from '$lib/components/ContentContainer.svelte';
  import Img from '$lib/components/Image/Img.svelte';
  import NDFilterCalc from '$lib/components/Tools/NDFilterCalc.svelte';
</script>

När man använder gråfilter/ND-filter så räknar kameran om slutartiden automatiskt. Är det lite sämre ljusförhållande i
kombination med ett starkt ND-filter så kommer man snabbt upp i längre slutartider och på många kameror så går
slutartiden bara till 30 sekunder. Då måste man ändra till Bulb eller Time mode på sin kamera och hålla reda på
slutartiden själv.

Det finns appar till telefoner för detta som är lättanvända och som dessutom kan meddela när tiden gått ut. Är man mer
analog finns det tabeller att printa ut och ha med sig, som den nedan.

<ContentContainer type="wide" title="Tabell för ND-filter">
  <Img src={`${path}/images/nisi-table.jpg`} />
</ContentContainer>

Jag har roat mig med att utveckla en egen kalkylator för att konvertera tiden med olika ND-filter. Ange bara vilket
filter, eller hur många bländarsteg det totalt blir om du stackar flera filter, samt slutartiden utan filter.  
Då räknas den korrekta slutartiden ut.

Slutartiderna kan variera lite mellan olika tabeller och appar pga avrundningar osv.

<NDFilterCalc />
