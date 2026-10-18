---
title: The Äquatormaßband
titleTemplate: false
description: A ribbon made of fabric scraps and stories that will one day stretch around the Earth.
pageClass: aequator-phase-one aequator-translated
sidebar: false
aside: false
outline: false
prev: false
next: false
announcements:
  - title: A school year with the Äquatormaßband
    date: School year 2026/27
    paragraphs: [["During the 2026/27 school year, the Äquatormaßband is taking part in a year-long project at Vienna’s ", {"text": "Berufsschule für Handel und Reisen", "url": "https://www.bshr.at/"}, ". Together with two classes, Bianca Trappl and Titania Chaos explore what fabrics and personal stories can tell us about ourselves. We collect, sew, play and get to know one another—with the aim of helping the ribbon grow and, at the end of the school year, symbolically encircling the school building with it."], ["A project about living together, our differences and what connects us."]]
---

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

type TextPart = string | { text: string; url: string }
interface Announcement {
  title: string
  date: string
  paragraphs: TextPart[][]
}
const { frontmatter } = useData()
// Edit announcements in this page's frontmatter; an empty list hides the block.
const announcements = computed<Announcement[]>(() => frontmatter.value.announcements ?? [])
</script>

<div class="aequator-project">

<span id="aquatormaßband-×-titania-chaos" class="aequator-anchor" aria-hidden="true"></span>

<div class="aequator-intro">

<div class="aequator-intro__copy">

# The Äquatormaßband {#das-aquatormaßband}

<p class="aequator-lead">A ribbon made of fabric scraps and stories that will one day stretch around the Earth.</p>

What if every person on Earth were represented by a small piece of fabric?

</div>

<figure class="media-figure aequator-intro__photo">
  <img :src="withBase('/images/aequator-titania-chaos-tuerkenschanzpark-2025-10-30.webp')" width="720" height="991" alt="Titania Chaos, wearing a red clown nose and a brown coat, stands beside a woman holding a yellow flag; the fabric ribbon forms a circle around them." loading="eager" fetchpriority="high" decoding="async">
  <figcaption>
    <span>Titania Chaos explains the Äquatormaßband in Türkenschanzpark on 30 October 2025.</span>
    <span class="media-figure__credit">Photo: Bianca Trappl</span>
  </figcaption>
</figure>

</div>

<div class="aequator-reading">

<span id="how-it-grows" class="aequator-anchor" aria-hidden="true"></span>

That thought became the Äquatormaßband, an art project by Bianca Trappl. People bring pieces of fabric that were once part of their lives and share the stories behind them. The pieces are sewn together and wound onto cable reels, creating a ribbon that keeps growing.

One day, it is meant to reach 40,075 kilometres—the circumference of the Earth at the equator.

Until then, there is plenty of sewing to do. And plenty of stories to tell.

Every new piece of fabric brings a piece of someone’s life with it. People who might otherwise never have met start talking. They share their stories, listen to others and are heard in return.

Perhaps peace begins right there: when people listen to one another and make room for each other’s stories.

And little by little, separate pieces of fabric become something shared.

<aside v-if="announcements.length" class="aequator-current" aria-labelledby="aequator-current-title">
  <h2 id="aequator-current-title">Latest news</h2>
  <article v-for="announcement in announcements" :key="announcement.title">
    <p class="aequator-current__date">{{ announcement.date }}</p>
    <h3>{{ announcement.title }}</h3>
    <p v-for="(paragraph, paragraphIndex) in announcement.paragraphs" :key="paragraphIndex"><template v-for="(part, index) in paragraph" :key="index"><template v-if="typeof part === 'string'">{{ part }}</template><a v-else :href="withBase(part.url)">{{ part.text }}</a></template></p>
  </article>
</aside>

## Your fabric. Your story. {#dein-stoff-deine-geschichte}

A piece of an old dress. Something left over from a sewing project. A fabric that reminds you of someone. Or one that has been sitting in a drawer for years.

Every piece of fabric has a story. Some are ordinary, others deeply personal. Often, only the people who have kept them know what they mean.

There are several ways to contribute to the Äquatormaßband: join one of our activities in a public space, arrange to meet us in person, or send your fabric and its story by post.

If meeting in person or handing over the fabric is not possible, a photograph and its story can also be uploaded through the project website.

[Visit the Äquatormaßband website – take part ↗](https://www.das-interessante.at/aequator/){.aequator-button .aequator-external}

## From a narrow waist to the equator {#von-der-wespentaille-zum-aquator}

The idea began while sewing a wide circular skirt for a dervish dance.

Making a skirt like this means knowing the waist measurement. That prompted a question: how big is the Earth’s waist?

Unlike a human waist, which is usually the narrowest part of the torso, our planet’s “waist” is at its widest point—the equator. Its circumference is around 40,075 kilometres.

That thought led to the idea of sewing pieces of fabric and their stories together into a measuring tape that would reach around the world.

At the beginning of 2025, around 8.16 billion people lived on Earth. If the length of the equator were divided equally among them, each person would have just 0.5 centimetres.

<MediaFigure id="aequator-skirt-dance" lang="en" presentation="poster" :width="520" :height="293" />

## The ribbon keeps growing {#das-band-wachst-weiter}

The Äquatormaßband regularly leaves the sewing workshop. It appears in parks, at festivals, at art events and in schools. Along the way, its length changes—and so do the ways people encounter it.

### 17 June 2026 · The Äquatormaßband at school

At Vienna’s Berufsschule für Handel und Reisen, the classroom became a sewing workshop. Students from a VKP class worked with fabrics, measurements and the stories behind them.

### 14 June 2026 · Kunstgebung, Vienna

At the third Kunstgebung, the Äquatormaßband took part in an art action in public space.

[A look back at Kunstgebung ↗](https://www.kunstgebung.at/l/das-war-die-3-kunstgebung-am-14-06-26/){.aequator-external}

### 21 March 2026 · Sucht & Menschsein Festival

At Theater DAS Margareten, Bianca Trappl and Titania Chaos presented the Äquatormaßband as an interactive installation. Among theatre, music and conversations about addiction and being human, the ribbon found its place too.

[View the festival programme ↗](https://www.dasmargareten.at/event-details/sucht-menschsein-festival-tag-1){.aequator-external}

### 2025–2026 · In public spaces

Märzpark, Türkenschanzpark, Platz der Menschenrechte: the Äquatormaßband has been out and about in Vienna’s parks and public squares on several occasions.

No admission fee, no registration. Anyone passing by could stop, get curious and join in.

<MediaFigure id="aequator-audience-crossing" lang="en" playsinline />

<span id="film-from-the-collaboration" class="aequator-anchor" aria-hidden="true"></span>

<details id="film-aus-der-zusammenarbeit" class="aequator-films">
<summary>More films from the collaboration</summary>

<MediaFigure id="aequator-stage-monologue" lang="en" />
<MediaFigure id="aequator-night-circle" lang="en" />
<MediaFigure id="aequator-skirt-dance" lang="en" />
<MediaFigure id="aequator-circle-performance" lang="en" />
<MediaFigure id="aequator-white-costume" lang="en" />
<MediaFigure id="youtube-igajwe6xm7o" lang="en" />
<MediaFigure id="youtube-jt3a8ywdlws" lang="en" />
<MediaFigure id="youtube-mrpckrjta9s" lang="en" />
<MediaFigure id="youtube-tuerkenschanzpark-2025" lang="en" />
<MediaFigure id="youtube-platz-menschenrechte-2025" lang="en" />

</details>

<span id="the-two-roles" class="aequator-anchor" aria-hidden="true"></span>

## Bianca Trappl × Titania Chaos {#bianca-trappl-×-titania-chaos}

Bianca Trappl is a master dressmaker and textile artist. After passing her master craftsperson’s examination in 2008, she worked in high-end fashion as a pattern maker and assistant to the management. Her artistic practice brings textile craftsmanship together with questions about how we live with one another.

The Äquatormaßband is her idea. Following her early artistic work with textiles, the project was revived in 2023 at Therapiezentrum Gersthof. Since then, it has appeared at venues and events including Galerie Atlas, the Sucht und Menschsein festival and Kunstgebung in Vienna. Since February 2025, Bianca has also been taking part in the Deep Listening process at Vienna’s Brunnenpassage.

Since 2025, Titania Chaos has been part of the Äquatormaßband as a clown and performance artist. Through improvisation, physical play and her curiosity about people, she opens up new possibilities for connection—especially where words alone are not enough.

Both share the belief that peace also begins in small ways: with a willingness to listen to one another, respect differences and understand other perspectives. The Äquatormaßband makes room for this without expecting everyone to agree.

[Find out more about the Äquatormaßband ↗](https://www.das-interessante.at/aequator/){.aequator-external}

<span id="read-on" class="aequator-anchor" aria-hidden="true"></span>

<aside class="aequator-support" aria-labelledby="aequator-support-title">
  <p id="aequator-support-title" class="aequator-support__title">Contact & support</p>
  <p>Questions about the project or interested in working together?</p>
  <div class="aequator-support__links">
    <a href="https://titaniachaos.com/#home-contact-title">Contact Titania</a>
    <a href="https://revolut.me/titaniachaos" class="aequator-external">Support via Revolut ↗</a>
  </div>
</aside>

</div>

</div>
