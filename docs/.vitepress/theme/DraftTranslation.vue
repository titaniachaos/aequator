<script setup lang="ts">
import { computed } from 'vue'
import type { Language } from '../../types/index.ts'

/**
 * Rule 5 of the blueprint: machine-generated translations stay draft until the
 * user has reviewed them. The page says so rather than the repository knowing
 * it privately.
 */
const props = defineProps<{ lang: Language }>()

const NOTE: Record<Language, string> = {
  de: '',
  en: 'Draft translation. German is the authentic source text for this project; this English version is machine-generated and has not been reviewed yet.',
  bg: 'Чернова на превода. Автентичният изходен текст на проекта е на немски; тази българска версия е машинно генерирана и още не е прегледана.'
}
const note = computed(() => NOTE[props.lang])
</script>

<template>
  <p v-if="note" class="draft-translation">{{ note }}</p>
</template>
