---
title: React For Beginners av Wes Bos – Uppdateringar
layout: post
seo-title: React For Beginners av Wes Bos – Uppdateringar
seo-description: Även om Wes Bos kurs React For Beginners har uppdaterats en gång har en del hänt och vissa funktioner har ändrats eller tagits bort.
tags:
  - React
  - React For Beginners
  - Wes Bos
categories:
  - Webbutveckling
poster: react-for-beginners.jpg
comments: true
excerpt: |
  Även om Wes Bos kurs React For Beginners har uppdaterats en gång har en del hänt och vissa funktioner har ändrats eller tagits bort.
draft: true
---

## BrowserRouter

I kursen används **BrowserRouter** med _Match_ och _Miss_ för att routa trafik. I kursen användes BrowserRouter v3.x och sedan v.4+ har den skrivits om en hel del och ändrats.

### Så här används BrowserRouter i kursen

{% highlight jsx linenos %}
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));

{% endhighlight %}
