---
title: Акции
description: Документирани акции на Äquatormaßband.
---

<script setup>
import { data } from '../.vitepress/actions.data.ts'
</script>

# Акции

<DraftTranslation lang="bg" />

Изброени са само акции с проверена дата и проверена принадлежност към Äquatormaßband.

<ActionCard v-for="action in data.actions" :key="action.stableId" :action="action" lang="bg" />

## Отворено

- За акцията на Площада на човешките права (септември 2025 г.) и за фестивала
  „Sucht &amp; Menschsein“ (март 2026 г.) е проверен само месецът, но не и точният ден.
- Протичането, художественото значение, участниците и екипът на отделните акции още не
  съществуват в проверен вид. **TBD.**
