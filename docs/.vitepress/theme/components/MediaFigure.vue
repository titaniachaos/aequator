<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import type { Language } from '../../../types/index.ts'
import { data } from '../../media.data.ts'
import { t } from '../localized.ts'

/**
 * A figure for one media item, addressed by its stable id. media.data.ts has
 * already dropped everything that is not `consentStatus: 'approved'`, so an
 * id that is pending or internal-only simply resolves to nothing and the
 * component renders nothing -- it cannot leak into the HTML by mistake.
 */
const props = defineProps<{ id: string; lang?: Language }>()

const lang = computed<Language>(() => props.lang ?? 'en')
const item = computed(() => data.byId[props.id])

/** Public assets live under docs/public; withBase() carries the /aequator/ base. */
const src = computed(() => {
  const file = item.value?.originalFile
  if (!file) return item.value?.sourceUrl ?? ''
  return withBase(file.startsWith('/') ? file : `/${file}`)
})

const caption = computed(() => t(item.value?.caption ?? item.value?.title, lang.value))
const alt = computed(() => t(item.value?.altText, lang.value) || caption.value)
const youtubeOpen = ref(false)
const youtubeId = computed(() => item.value?.sourceUrl?.match(/[?&]v=([^&]+)/)?.[1] ?? '')
const youtubeEmbed = computed(() => `https://www.youtube-nocookie.com/embed/${youtubeId.value}?autoplay=1`)
const youtubeLabels = {
  en: { play: 'Play video from YouTube', open: 'Open on YouTube' },
  de: { play: 'Video von YouTube abspielen', open: 'Auf YouTube öffnen' },
  bg: { play: 'Пускане на видеото от YouTube', open: 'Отваряне в YouTube' }
}
const youtubeLabel = computed(() => youtubeLabels[lang.value])
const credit = computed(() => {
  const parts = [item.value?.creator, item.value?.copyrightHolder].filter(Boolean)
  return parts.length ? `© ${parts.join(' · ')}` : ''
})
</script>

<template>
  <figure v-if="item" class="media-figure">
    <img
      v-if="item.type === 'image'"
      :src="src"
      :alt="alt"
      :style="item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined"
      loading="lazy"
      decoding="async"
    />
    <video
      v-else-if="item.type === 'video_file'"
      :src="src"
      :poster="item.posterUrl"
      controls
      preload="none"
    />
    <div v-else-if="item.type === 'youtube'" class="media-figure__youtube">
      <iframe
        v-if="youtubeOpen"
        :src="youtubeEmbed"
        :title="alt"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <button v-else type="button" @click="youtubeOpen = true">
        <span class="media-figure__play" aria-hidden="true">▶</span>
        <span>{{ youtubeLabel.play }}</span>
      </button>
      <a :href="src" target="_blank" rel="noopener noreferrer">{{ youtubeLabel.open }}</a>
    </div>
    <audio v-else-if="item.type === 'audio'" :src="src" controls preload="none" />
    <figcaption v-if="caption || credit">
      <span v-if="caption">{{ caption }}</span>
      <span v-if="credit" class="media-figure__credit">{{ credit }}</span>
    </figcaption>
  </figure>
</template>
