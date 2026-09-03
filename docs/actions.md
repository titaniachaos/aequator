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

- A description exists for the “Sucht &amp; Menschsein” festival (Margareten, March 2026),
  but its affiliation with the Äquatormaßband is **unverified**. The action stays
  unpublished until the source confirms it.
- For the action at Platz der Menschenrechte only the month (September 2025) is verified,
  not the exact day.
- What happened, artistic relevance, participants and credits for the individual actions
  do not yet exist in verified form. **TBD.**
