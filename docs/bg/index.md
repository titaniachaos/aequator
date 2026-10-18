---
title: Екваторната лента
titleTemplate: false
description: Лента от парчета плат и лични истории, която един ден ще обиколи Земята.
pageClass: aequator-phase-one aequator-translated
sidebar: false
aside: false
outline: false
prev: false
next: false
announcements:
  - title: Една учебна година с Екваторната лента
    date: Учебна 2026/2027 година
    paragraphs: [["През учебната 2026/2027 година Екваторната лента гостува в ", {"text": "Berufsschule für Handel und Reisen", "url": "https://www.bshr.at/"}, " — професионално училище по търговия и туризъм във Виена."], ["Заедно с ученици от два класа Бианка Трапл и Титания Хаос изследват какво могат да ни разкажат платовете и личните истории за хората. Събираме, шием, играем и се опознаваме. Целта е лентата да продължи да расте, а в края на учебната година символично да обиколим с нея училищната сграда."], ["Проект за съвместния живот, различията между нас и онова, което ни свързва."]]
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

# Екваторната лента {#das-aquatormaßband}

<p class="aequator-lead">Лента от парчета плат и лични истории, която един ден ще обиколи Земята.</p>

Ами ако всеки човек на Земята бъде представен с малко парче плат?

</div>

<figure class="media-figure aequator-intro__photo">
  <img :src="withBase('/images/aequator-titania-chaos-tuerkenschanzpark-2025-10-30.webp')" width="720" height="991" alt="Титания Хаос с червен клоунски нос и кафяво палто до жена с жълто знаме; платнената лента образува кръг около двете." loading="eager" fetchpriority="high" decoding="async">
  <figcaption>
    <span>Титания Хаос представя Екваторната лента в Тюркеншанцпарк на 30 октомври 2025 г.</span>
    <span class="media-figure__credit">Снимка: Bianca Trappl</span>
  </figcaption>
</figure>

</div>

<div class="aequator-reading">

<span id="как-расте" class="aequator-anchor" aria-hidden="true"></span>

От тази идея се ражда Екваторната лента — художествен проект на Бианка Трапл. Хората носят парчета плат, които някога са били част от живота им, и споделят свързаните с тях истории. Парчетата се зашиват едно за друго и се навиват на макари за кабели. Така лентата постепенно става все по-дълга.

Целта е един ден тя да достигне 40 075 километра — колкото е обиколката на Земята по екватора.

Дотогава има още много за шиене. И много истории за разказване.

С всяко ново парче плат към лентата се прибавя и частица от нечий живот. Хора, които иначе може би никога не биха се срещнали, започват да разговарят. Споделят историите си, изслушват другите и на свой ред намират кой да ги изслуша.

Може би мирът започва именно така: когато се вслушваме един в друг и даваме пространство на чуждите истории.

И малко по малко отделните парчета плат се превръщат в нещо общо.

<aside v-if="announcements.length" class="aequator-current" aria-labelledby="aequator-current-title">
  <h2 id="aequator-current-title">Актуално</h2>
  <article v-for="announcement in announcements" :key="announcement.title">
    <p class="aequator-current__date">{{ announcement.date }}</p>
    <h3>{{ announcement.title }}</h3>
    <p v-for="(paragraph, paragraphIndex) in announcement.paragraphs" :key="paragraphIndex"><template v-for="(part, index) in paragraph" :key="index"><template v-if="typeof part === 'string'">{{ part }}</template><a v-else :href="withBase(part.url)">{{ part.text }}</a></template></p>
  </article>
</aside>

## Твоят плат. Твоята история. {#dein-stoff-deine-geschichte}

Парче от стара рокля. Остатък от шивашки проект. Плат, който ти напомня за някого. Или парче, което от години стои забравено в чекмеджето.

Всяко парче плат има своя история. Някои истории са съвсем обикновени, други — дълбоко лични. Често само хората, които пазят тези платове, знаят какво означават за тях.

Можеш да се включиш в Екваторната лента по няколко начина: да дойдеш на някоя от нашите прояви на открито, да се уговориш за лична среща с нас или да изпратиш парче плат и неговата история по пощата.

Ако не можеш да се срещнеш с нас или да предадеш плата лично, можеш да изпратиш негова снимка и историята му чрез сайта на проекта.

[Към сайта на проекта — включи се ↗](https://www.das-interessante.at/aequator/){.aequator-button .aequator-external}

## От тънката талия до екватора {#von-der-wespentaille-zum-aquator}

Идеята се ражда по време на шиенето на широка пола за дервишки танц.

За да се ушие такава пола, трябва да се знае обиколката на талията. Така възниква въпросът: а каква е обиколката на „талията“ на Земята?

За разлика от човешката талия, която обикновено е най-тясната част на торса, „талията“ на нашата планета се намира там, където тя е най-широка — на екватора. Неговата дължина е приблизително 40 075 километра.

Оттук се ражда идеята парчета плат, всяко със своя история, да бъдат съединени в една обща мерителна лента, която да обиколи Земята.

В началото на 2025 г. населението на Земята е около 8,16 милиарда души. Ако разделим дължината на екватора поравно между всички, на всеки човек ще се паднат едва около 0,5 сантиметра.

<MediaFigure id="aequator-skirt-dance" lang="bg" presentation="poster" :width="520" :height="293" />

## Лентата продължава да расте {#das-band-wachst-weiter}

Екваторната лента редовно напуска шивашката работилница. Можем да я срещнем в паркове, на фестивали, на артистични прояви и в училища. С всяка нова среща се променя не само дължината ѝ, но и начинът, по който хората общуват чрез нея.

### 17 юни 2026 г. · Екваторната лента в училище

В Berufsschule für Handel und Reisen във Виена класната стая се превърна в шивашка работилница. Ученици от паралелка VKP работиха с платове, мерки и свързаните с тях истории.

### 14 юни 2026 г. · Kunstgebung, Виена

По време на третото издание на Kunstgebung Екваторната лента участва в художествена проява в публичното пространство.

[Виж как премина третото издание на Kunstgebung ↗](https://www.kunstgebung.at/l/das-war-die-3-kunstgebung-am-14-06-26/){.aequator-external}

### 21 март 2026 г. · Фестивал Sucht & Menschsein

В театър DAS Margareten Бианка Трапл и Титания Хаос представиха Екваторната лента като интерактивна инсталация. Сред театралните представления, музиката и разговорите за зависимостите и човешкото съществуване лентата също намери своето място.

[Към програмата на фестивала ↗](https://www.dasmargareten.at/event-details/sucht-menschsein-festival-tag-1){.aequator-external}

### 2025–2026 г. · В публичното пространство

Мерцпарк, Тюркеншанцпарк, площад „Права на човека“ — Екваторната лента неведнъж е гостувала в паркове и на площади във Виена.

Без входна такса и без предварително записване. Всеки минувач е можел да спре, да прояви любопитство и да се включи.

<MediaFigure id="aequator-audience-crossing" lang="bg" playsinline />

<span id="филм-от-сътрудничеството" class="aequator-anchor" aria-hidden="true"></span>

<details id="film-aus-der-zusammenarbeit" class="aequator-films">
<summary>Още видеа от съвместната работа</summary>

<MediaFigure id="aequator-stage-monologue" lang="bg" />
<MediaFigure id="aequator-night-circle" lang="bg" />
<MediaFigure id="aequator-skirt-dance" lang="bg" />
<MediaFigure id="aequator-circle-performance" lang="bg" />
<MediaFigure id="aequator-white-costume" lang="bg" />
<MediaFigure id="youtube-igajwe6xm7o" lang="bg" />
<MediaFigure id="youtube-jt3a8ywdlws" lang="bg" />
<MediaFigure id="youtube-mrpckrjta9s" lang="bg" />
<MediaFigure id="youtube-tuerkenschanzpark-2025" lang="bg" />
<MediaFigure id="youtube-platz-menschenrechte-2025" lang="bg" />

</details>

<span id="двете-роли" class="aequator-anchor" aria-hidden="true"></span>

## Бианка Трапл × Титания Хаос {#bianca-trappl-×-titania-chaos}

Бианка Трапл е майстор шивач на дамско облекло и текстилна художничка. След като през 2008 г. полага майсторския си изпит, тя работи във висшия сегмент на модната индустрия като конструктор на облекло и асистент на ръководството. В творчеството си съчетава текстилното майсторство с въпроси, свързани с човешкото съжителство.

Екваторната лента е нейна идея. След първите ѝ художествени работи с текстил проектът е възобновен през 2023 г. в терапевтичния център „Герстхоф“. Оттогава е представян на различни места и събития, сред които галерия „Атлас“, фестивалът Sucht und Menschsein и Kunstgebung във Виена. От февруари 2025 г. Бианка участва и в процеса Deep Listening във виенската „Бруненпасаж“.

От 2025 г. Титания Хаос се включва в проекта като клоунеса и пърформанс артистка. Чрез импровизация, игра с тялото и движението и неподправено любопитство към хората тя открива нови възможности за общуване — особено там, където думите не са достатъчни.

И двете споделят убеждението, че мирът започва и с малките жестове: с готовността да се изслушваме, да приемаме различията и да се опитваме да разберем чуждата гледна точка.

Екваторната лента създава пространство за това, без да изисква всички да бъдат на едно мнение.

[Научи повече за проекта ↗](https://www.das-interessante.at/aequator/){.aequator-external}

<span id="продължете-с" class="aequator-anchor" aria-hidden="true"></span>

<aside class="aequator-support" aria-labelledby="aequator-support-title">
  <p id="aequator-support-title" class="aequator-support__title">Контакт и подкрепа</p>
  <p>Имаш въпроси за проекта или искаш да работим заедно?</p>
  <div class="aequator-support__links">
    <a href="https://titaniachaos.com/bg/#home-contact-title">Свържи се с Титания</a>
    <a href="https://revolut.me/titaniachaos" class="aequator-external">Подкрепи проекта чрез Revolut ↗</a>
  </div>
</aside>

</div>

</div>
