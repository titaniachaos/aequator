<script setup lang="ts">
/**
 * One person and what they do in the project. The text is passed in from the
 * Markdown of each locale rather than read from a data file, so a reviewer
 * reads the exact sentence that will be published, in the language it is
 * published in.
 */
defineProps<{ name: string; role: string; bio?: string }>()
</script>

<template>
  <article class="role-block">
    <h3>{{ name }}</h3>
    <p class="role-block__role">{{ role }}</p>
    <p v-if="bio" class="role-block__bio">{{ bio }}</p>
    <slot />
  </article>
</template>
