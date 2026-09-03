---
title: Aktionen
description: Dokumentierte Aktionen des Äquatormaßbands.
---

<script setup>
import { data } from '../.vitepress/actions.data.ts'
</script>

# Aktionen

Aufgeführt sind nur Aktionen mit geprüftem Datum und geprüfter Zugehörigkeit zum
Äquatormaßband.

<ActionCard v-for="action in data.actions" :key="action.stableId" :action="action" lang="de" />

## Offen

- Für die Aktion am Platz der Menschenrechte (September 2025) und für das Festival
  „Sucht &amp; Menschsein“ (März 2026) ist nur der Monat, nicht der genaue Tag geprüft.
- Verlauf, künstlerische Einordnung, Beteiligte und Credits der einzelnen Aktionen sind
  noch nicht in geprüfter Form vorhanden. **TBD.**
