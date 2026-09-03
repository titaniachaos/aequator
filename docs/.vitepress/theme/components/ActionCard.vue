<script setup lang="ts">
import { computed } from 'vue'
import type { Action, Language, Status } from '../../../types/index.ts'
import { data as mediaData } from '../../media.data.ts'
import { formatDate, t } from '../localized.ts'
import MediaFigure from './MediaFigure.vue'

/**
 * One action. The card never decides what may be shown: actions.data.ts has
 * already dropped everything that is not `publicationStatus: 'published'`.
 */
const props = defineProps<{ action: Action; lang?: Language }>()

const lang = computed<Language>(() => props.lang ?? 'en')
const title = computed(() => t(props.action.title, lang.value))
const summary = computed(() => t(props.action.summary, lang.value))
const when = computed(() => formatDate(props.action.date, lang.value))

/** The place is its own line only when it says something the title does not. */
const place = computed(() => {
  const value = t(props.action.place, lang.value)
  return value === title.value ? '' : value
})

const context = computed(() => {
  const value = t(props.action.venueOrContext, lang.value)
  return value === summary.value ? '' : value
})

const STATUS_LABELS: Record<Language, Record<Status, string>> = {
  en: { published: '', draft: 'draft', 'rights-pending': 'rights pending', planned: 'planned', TBD: 'TBD' },
  de: { published: '', draft: 'Entwurf', 'rights-pending': 'Rechte offen', planned: 'geplant', TBD: 'TBD' },
  bg: { published: '', draft: 'чернова', 'rights-pending': 'предстоящи права', planned: 'планирано', TBD: 'TBD' }
}

/**
 * Empty for a published action: every card in the list is published, so the
 * word carries no information. The badge appears when the status is worth
 * saying -- a planned action, or one whose rights are still open.
 */
const statusLabel = computed(() => STATUS_LABELS[lang.value][props.action.status])

/**
 * The action's own media. An id that names a frame whose consent is not
 * approved resolves to nothing here, because media.data.ts never emitted it --
 * so an action cannot pull an uncleared photograph onto the page by listing it.
 */
const figures = computed(() =>
  (props.action.mediaIds ?? []).filter((id) => mediaData.byId[id])
)
</script>

<template>
  <article class="action-card">
    <h3>{{ title }}</h3>
    <p class="action-card__meta">
      <span v-if="statusLabel" class="badge-status">{{ statusLabel }}</span>
      <time :datetime="action.date">{{ when }}</time>
      <span v-if="place">{{ place }}</span>
    </p>
    <p class="action-card__summary">{{ summary }}</p>
    <p v-if="context" class="action-card__context">{{ context }}</p>
    <MediaFigure v-for="id in figures" :key="id" :id="id" :lang="lang" />
    <slot />
  </article>
</template>
