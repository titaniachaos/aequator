import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Aequator",
  description: "A VitePress documentation site",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Guide', link: '/guide/' }
        ]
      }
    ]
  }
})
