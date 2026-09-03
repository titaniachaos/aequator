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

- Bei drei Aktionen ist nur der Monat geprüft, nicht der genaue Tag: Platz der
  Menschenrechte (September 2025), Wien (November 2025) und das Festival
  „Sucht &amp; Menschsein“ (März 2026).
- Für die Aktion im November 2025 ist der Ort innerhalb Wiens nicht erfasst. Titel und
  Zusammenfassung geben die zum Film veröffentlichte Bildunterschrift wieder und
  behaupten nichts darüber hinaus.
- Verlauf, künstlerische Einordnung, Beteiligte und Credits der einzelnen Aktionen sind
  noch nicht in geprüfter Form vorhanden. **TBD.**
