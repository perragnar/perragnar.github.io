---
layout: page
title: Arkiv
poster: perragnar.jpg
seo-title: Arkiv över Per Ragnar Edins blog
seo-description: Per Ragnar Edins blogarkiv
page_open: false
---

<div class="post">
    <div class="box">
        <p>
            Här listas alla inlägg i bloggen i kronologisk ordning.
        </p>
        <section class="generic-post-list">
            {% for post in site.posts %}
                {% unless post.draft %}
                    {% assign currentDate = post.date | date: "%Y" %}
                    {% if currentDate != myDate %}
                        {% unless forloop.first %}
                            </ul>
                        {% endunless %}
                        <h4 class="header">{{ currentDate }}</h4>
                        <ul>
                            {% assign myDate = currentDate %}
                    {% endif %}
                    <li>
                        <div class="post-date">{% include datetime.html datetime=post.date %}</div>
                        <div class="post-name"><a href="{{ post.url }}">{{ post.title }}</a></div>
                    </li>
                    {% if forloop.last %}
                        </ul>
                    {% endif %}
                {% endunless %}
            {% endfor %}
        </section>
    </div>
</div>
