<script setup lang="ts">
import { useData } from 'vitepress'

const { theme } = useData<{ projectBrand: { href: string; name: string } }>()
</script>

<template>
  <div class="project-nav-title">
    <a :href="theme.projectBrand.href">Titania Chaos</a>
    <span>X {{ theme.projectBrand.name }}</span>
  </div>
</template>

<style scoped>
.project-nav-title {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  column-gap: 0.35em;
  height: 100%;
  max-width: calc(100vw - 96px);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.project-nav-title a {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.project-nav-title a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (min-width: 960px) {
  .has-sidebar .project-nav-title {
    max-width: 100%;
  }
}
</style>
