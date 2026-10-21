---
title: Das Äquatormaßband
titleTemplate: false
description: Ein Band aus Stoffen und Geschichten, das einmal um die Erde reichen soll.
pageClass: aequator-phase-one
sidebar: false
aside: false
outline: false
prev: false
next: false
announcements:
  - title: Ein Schuljahr mit dem Äquatormaßband
    date: Schuljahr 2026/27
    link:
      text: Zur Schulchronik
      url: /de/schulchronik
    teaser:
      - "Im Schuljahr 2026/27 ist das Äquatormaßband zu Gast an der "
      - text: Berufsschule für Handel und Reisen
        url: https://www.bshr.at/
      - " in Wien. Gemeinsam mit zwei Klassen erkunden Bianca Trappl und Titania Chaos, was Stoffe und persönliche Geschichten über uns erzählen. Wir sammeln, nähen, spielen und begegnen einander – mit dem Ziel, das Band wachsen zu lassen und am Ende des Schuljahres das Schulgebäude symbolisch damit zu umrunden. Ein Projekt über Zusammenleben, Unterschiede und das, was uns verbindet."
---

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface Announcement {
  title: string
  date: string
  teaser: string | Array<string | { text: string; url: string }>
  draft?: boolean
  link?: { text: string; url: string }
}

const { frontmatter } = useData()
// Edit announcements here in the page's Markdown frontmatter. An empty list
// (or removing it) removes the entire block from the served HTML.
const announcements = computed<Announcement[]>(() => frontmatter.value.announcements ?? [])
</script>

<div class="aequator-project">

<span id="aquatormaßband-×-titania-chaos" class="aequator-anchor" aria-hidden="true"></span>

<div class="aequator-intro">

<div class="aequator-intro__copy">

# Das Äquatormaßband

<p class="aequator-lead">Ein Band aus Stoffen und Geschichten, das einmal um die Erde reichen soll.</p>

Was wäre, wenn jeder Mensch auf der Erde durch ein kleines Stück Stoff vertreten wäre?

</div>

<figure class="media-figure aequator-intro__photo">
  <img :src="withBase('/images/aequator-titania-chaos-tuerkenschanzpark-2025-10-30.webp')" width="720" height="991" alt="Titania Chaos mit roter Clownnase und braunem Mantel neben einer Frau mit gelber Fahne; das Stoffband liegt im Kreis um beide." loading="eager" fetchpriority="high" decoding="async">
  <figcaption>
    <span>Titania Chaos erklärt das Äquatormaßband im Türkenschanzpark am 30. Oktober 2025.</span>
    <span class="media-figure__credit">Foto: Bianca Trappl</span>
  </figcaption>
</figure>

</div>

<div class="aequator-reading">

<span id="wie-es-entsteht" class="aequator-anchor" aria-hidden="true"></span>

Aus dieser Vorstellung ist das Äquatormaßband entstanden, ein Kunstprojekt von Bianca Trappl. Menschen bringen Stoffstücke mit, die einmal zu ihrem Leben gehört haben, und erzählen die Geschichten dazu. Die Stoffe werden zusammengenäht, auf Kabelrollen gewickelt und bilden ein Band, das immer weiterwächst.

40.075 Kilometer soll es einmal lang werden – so groß ist der Umfang der Erde am Äquator.

Bis dahin gibt es viel zu nähen. Und viel zu erzählen.

Denn mit jedem neuen Stück Stoff kommt auch ein Stück Leben hinzu. Menschen, die sich sonst vielleicht nie begegnet wären, kommen miteinander ins Gespräch. Sie erzählen, hören zu und werden selbst gehört.

Vielleicht beginnt Frieden genau dort: wo Menschen einander zuhören und den Geschichten der anderen Raum geben.

Und aus einzelnen Stoffstücken entsteht nach und nach etwas Gemeinsames.

<aside v-if="announcements.length" class="aequator-current" aria-labelledby="aequator-current-title">
  <h2 id="aequator-current-title">Aktuell</h2>
  <article v-for="announcement in announcements" :key="announcement.title">
    <p class="aequator-current__date">{{ announcement.date }}</p>
    <h3>{{ announcement.title }}</h3>
    <p><template v-for="(part, index) in (Array.isArray(announcement.teaser) ? announcement.teaser : [announcement.teaser])" :key="index"><template v-if="typeof part === 'string'">{{ part }}</template><a v-else :href="withBase(part.url)">{{ part.text }}</a></template></p>
    <p v-if="announcement.draft" class="aequator-current__review">Entwurf · zur redaktionellen Freigabe</p>
    <p v-if="announcement.link?.url && announcement.link?.text">
      <a :href="withBase(announcement.link.url)">{{ announcement.link.text }}</a>
    </p>
  </article>
</aside>

## Dein Stoff. Deine Geschichte.

Ein Stück aus einem alten Kleid. Ein Rest von einem Nähprojekt. Ein Stoff, der an jemanden erinnert. Oder einer, der schon lange in einer Schublade liegt.

Jeder Stoff hat seine Geschichte. Manche sind alltäglich, andere sehr persönlich. Was sie bedeuten, wissen oft nur die Menschen, die sie aufbewahrt haben.

Es gibt verschiedene Möglichkeiten, zum Äquatormaßband beizutragen: bei einer unserer Aktionen im öffentlichen Raum, bei einem vereinbarten persönlichen Besuch oder indem Stoff und Geschichte per Post geschickt werden.

Wenn eine persönliche Begegnung oder die Übergabe des Stoffes nicht möglich ist, können auch ein Foto und die dazugehörige Geschichte über die Projektwebsite hochgeladen werden.

[Zum Äquatormaßband – Mitmachen ↗](https://www.das-interessante.at/aequator/){.aequator-button .aequator-external}

## Von der Wespentaille zum Äquator

Die Idee entstand beim Nähen eines Derwisch-Kreisrocks.

Um einen solchen Rock anzufertigen, muss man den Taillenumfang kennen. Dabei tauchte eine Frage auf: Wie groß ist eigentlich die Taille der Erde?

Anders als die menschliche Wespentaille liegt die „Taille“ unseres Planeten an seiner breitesten Stelle – am Äquator. Sein Umfang beträgt rund 40.075 Kilometer.

Aus diesem Gedanken entstand die Idee, Stoffstücke und die Geschichten, die mit ihnen verbunden sind, zu einem weltumspannenden Maßband zusammenzunähen.

Anfang 2025 lebten rund 8,16 Milliarden Menschen auf der Erde. Würde man die Länge des Äquators gleichmäßig auf alle verteilen, entfielen auf jeden Menschen gerade einmal 0,5 Zentimeter.

<MediaFigure id="aequator-skirt-dance" lang="de" presentation="poster" :width="520" :height="293" />

## Das Band wächst weiter

Das Äquatormaßband verlässt regelmäßig die Nähwerkstatt. Es taucht in Parks, auf Festivals, bei Kunstveranstaltungen und in Schulen auf. Dabei verändert sich nicht nur seine Länge, sondern auch die Art, wie Menschen damit in Berührung kommen.

### 17. Juni 2026 · Das Äquatormaßband in der Schule

An der Berufsschule für Handel und Reisen in Wien wurde das Klassenzimmer zur Nähwerkstatt. Schülerinnen und Schüler einer VKP-Klasse arbeiteten mit Stoffen, Maßen und den Geschichten dahinter.

### 14. Juni 2026 · Kunstgebung, Wien

Bei der dritten Kunstgebung war das Äquatormaßband Teil einer Kunstaktion im öffentlichen Raum.

[Ein Rückblick auf die Kunstgebung ↗](https://www.kunstgebung.at/l/das-war-die-3-kunstgebung-am-14-06-26/){.aequator-external}

### 21. März 2026 · Sucht & Menschsein Festival

Im Theater DAS Margareten präsentierten Bianca Trappl und Titania Chaos das Äquatormaßband als interaktive Installation. Zwischen Theater, Musik und Gesprächen über Sucht und Menschsein fand auch das Band seinen Platz.

[Zum Festivalprogramm ↗](https://www.dasmargareten.at/event-details/sucht-menschsein-festival-tag-1){.aequator-external}

### 2025–2026 · Im öffentlichen Raum

Märzpark, Türkenschanzpark, Platz der Menschenrechte: Das Äquatormaßband war mehrfach in Wiener Parks und auf öffentlichen Plätzen unterwegs. Ohne Eintritt, ohne Anmeldung. Wer vorbeikam, konnte stehen bleiben, neugierig werden und mitmachen.

<MediaFigure id="aequator-audience-crossing" lang="de" playsinline />

<details id="film-aus-der-zusammenarbeit" class="aequator-films">
<summary>Weitere Filme aus der Zusammenarbeit</summary>

<MediaFigure id="aequator-stage-monologue" lang="de" />
<MediaFigure id="aequator-night-circle" lang="de" />
<MediaFigure id="aequator-skirt-dance" lang="de" />
<MediaFigure id="aequator-circle-performance" lang="de" />
<MediaFigure id="aequator-white-costume" lang="de" />
<MediaFigure id="youtube-igajwe6xm7o" lang="de" />
<MediaFigure id="youtube-jt3a8ywdlws" lang="de" />
<MediaFigure id="youtube-mrpckrjta9s" lang="de" />
<MediaFigure id="youtube-tuerkenschanzpark-2025" lang="de" />
<MediaFigure id="youtube-platz-menschenrechte-2025" lang="de" />

</details>

<span id="die-beiden-rollen" class="aequator-anchor" aria-hidden="true"></span>

## Bianca Trappl × Titania Chaos

Bianca Trappl ist Damenkleidermachermeisterin und Textilkünstlerin. Nach ihrer Meisterprüfung 2008 arbeitete sie im gehobenen Modesegment als Schnittzeichnerin und Assistentin der Geschäftsführung. Ihre künstlerische Arbeit verbindet textile Handwerkskunst mit Fragen des menschlichen Zusammenlebens.

Das Äquatormaßband ist ihre Idee. Nach ersten künstlerischen Arbeiten mit Textilien wurde das Projekt 2023 im Therapiezentrum Gersthof wiederbelebt. Seither war es unter anderem in der Galerie Atlas, beim Festival „Sucht und Menschsein“ und bei der Kunstgebung in Wien zu erleben. Seit Februar 2025 beteiligt sich Bianca außerdem am Deep-Listening-Prozess in der Wiener Brunnenpassage.

Seit 2025 begleitet Titania Chaos das Äquatormaßband als Clownin und Performancekünstlerin. Mit Improvisation, körperlichem Spiel und ihrer Neugier auf Menschen eröffnet sie neue Möglichkeiten der Begegnung – gerade dort, wo Sprache allein nicht ausreicht.

Beide verbindet die Überzeugung, dass Frieden auch im Kleinen beginnt: mit der Bereitschaft, einander zuzuhören, Unterschiede auszuhalten und andere Sichtweisen zu verstehen. Das Äquatormaßband schafft dafür Raum, ohne vorauszusetzen, dass alle einer Meinung sein müssen.

[Mehr über das Äquatormaßband erfahren ↗](https://www.das-interessante.at/aequator/){.aequator-external}

<span id="weiterlesen" class="aequator-anchor" aria-hidden="true"></span>

<aside class="aequator-support" aria-labelledby="aequator-support-title">
  <p id="aequator-support-title" class="aequator-support__title">Kontakt & Unterstützung</p>
  <p>Fragen zum Projekt oder Interesse an einer Zusammenarbeit?</p>
  <div class="aequator-support__links">
    <a href="https://titaniachaos.com/de/#home-contact-title">Titania kontaktieren</a>
    <a href="https://revolut.me/titaniachaos" class="aequator-external">Über Revolut unterstützen ↗</a>
  </div>
</aside>

</div>

</div>
