---
title: Actions
description: Documented actions of the Äquatormaßband.
---

<script setup>
import { data } from './.vitepress/actions.data.ts'
</script>

# Actions

<DraftTranslation lang="en" />

Only actions with a verified date and verified affiliation to the Äquatormaßband are
listed.

<ActionCard v-for="action in data.actions" :key="action.stableId" :action="action" lang="en" />

## Open

- For the action at Platz der Menschenrechte (September 2025) and for the
  “Sucht &amp; Menschsein” festival (March 2026) only the month is verified, not the
  exact day.
- What happened, artistic relevance, participants and credits for the individual actions
  do not yet exist in verified form. **TBD.**
