---
layout: page
title: Index
poster: perragnar.jpg
seo-title: Index över Per Ragnar Edins blog
seo-description: Per Ragnar Edins blogindex
page_open: false
---

{% assign rawtags = "" %}
{% for post in site.posts %}
  {% unless post.draft %}
    {% assign ttags = post.tags | join:'|' | append:'|' %}
    {% assign rawtags = rawtags | append:ttags %}
  {% endunless %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}
{% for tag in rawtags %}
  {% if tag != "" %}
    {% if tags == "" %}
      {% assign tags = tag | split:'|' %}
    {% endif %}
    {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}

<div class="post">
  <div class="box">
    <section class="tags-index">
      <div class="tags">
        <p>
          Här hittar du alla tags (etiketter) på inlägg i bloggen. Klicka på en tag och se vilka inlägg som är relaterade till just den.
        </p>
        
        <ul>
          {% for tag in tags %}
            <li><a href="#{{ tag | slugify }}" class="tag">{{ tag }}</a></li>
          {% endfor %}
        </ul>
      </div>
      <section class="generic-post-list">
        {% for tag in tags %}
          <h4 class="header" id="{{ tag | slugify }}">{{ tag }}</h4>
          <ul>
            {% for post in site.posts %}
              {% unless post.draft %}
                {% if post.tags contains tag %}
                  <li>
                    <div class="post-date">{% include datetime.liquid datetime=post.date %}</div>
                    <div class="post-name"><a href="{{ post.url }}">{{ post.title }}</a></div>
                  </li>
                {% endif %}
              {% endunless %}
            {% endfor %}
          </ul>
        {% endfor %}
      </section>
    </section>
  </div>
</div>
