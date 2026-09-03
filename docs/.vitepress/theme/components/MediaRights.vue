<script setup lang="ts">
import { data } from '../../media.data.ts'

/**
 * The rights notice, read from media.json rather than written into each locale's
 * credits page. It was retyped in three files before this component existed, and
 * three hand-kept copies of a sentence naming nine photographers is three chances
 * to correct two of them.
 */
</script>

<template>
  <blockquote v-if="data.rights" class="media-rights">{{ data.rights }}</blockquote>
</template>
