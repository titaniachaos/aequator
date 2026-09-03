<script setup lang="ts">
import { computed } from 'vue'
import type { Language } from '../../../types/index.ts'
import { data } from '../../project.data.ts'
import { t } from '../localized.ts'

const props = defineProps<{ lang?: Language }>()
const lang = computed<Language>(() => props.lang ?? 'en')

const sentence = computed(() => t(data.project.oneSentence, lang.value))

const LABELS: Record<Language, { creator: string; with: string; target: string }> = {
  en: { creator: 'Created by', with: 'Accompanied by', target: 'Intended length' },
  de: { creator: 'Geschaffen von', with: 'Begleitet von', target: 'Gedachte Länge' },
  bg: { creator: 'Създадено от', with: 'Съпровождано от', target: 'Замислена дължина' }
}
const labels = computed(() => LABELS[lang.value])

/** Rendered only when a verified value exists; no placeholder numbers. */
const targetKm = computed(() => data.project.targetMeasureKm)
</script>

<template>
  <section class="aequator-hero">
    <p class="aequator-hero__sentence">{{ sentence }}</p>
    <dl class="aequator-hero__facts">
      <div>
        <dt>{{ labels.creator }}</dt>
        <dd>{{ data.project.creator }}</dd>
      </div>
      <div v-if="data.project.collaborator">
        <dt>{{ labels.with }}</dt>
        <dd>{{ data.project.collaborator }}{{ data.project.collaborationStartYear ? ` · ${data.project.collaborationStartYear}` : '' }}</dd>
      </div>
      <div v-if="targetKm">
        <dt>{{ labels.target }}</dt>
        <dd>{{ targetKm.toLocaleString('en-GB').replace(/,/g, ' ') }} km</dd>
      </div>
    </dl>
  </section>
</template>
