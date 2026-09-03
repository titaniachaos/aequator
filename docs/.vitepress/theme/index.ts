import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AequatorHero from './components/AequatorHero.vue'
import ActionCard from './components/ActionCard.vue'
import MediaFigure from './components/MediaFigure.vue'
import RoleBlock from './components/RoleBlock.vue'
import DraftTranslation from './DraftTranslation.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registered globally because every call site is Markdown.
    app.component('AequatorHero', AequatorHero)
    app.component('ActionCard', ActionCard)
    // Renders only media whose consent is approved; see media.data.ts.
    app.component('MediaFigure', MediaFigure)
    app.component('RoleBlock', RoleBlock)
    app.component('DraftTranslation', DraftTranslation)
  }
} satisfies Theme
