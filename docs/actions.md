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

- Three actions are verified to the month only, not the exact day: Platz der
  Menschenrechte (September 2025), Vienna (November 2025) and the
  “Sucht &amp; Menschsein” festival (March 2026).
- For the November 2025 action the venue within Vienna is not recorded. Its title and
  summary restate the caption and alt text published with the film, and claim nothing
  beyond them.
- What happened, artistic relevance, participants and credits for the individual actions
  do not yet exist in verified form. **TBD.**
