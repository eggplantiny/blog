export default function ({ store }) {
  // Only in development
  if (process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on('content:update', () => {
        // Refresh the store categories
        store.dispatch('articles/fetchArticleList')
      })
    })
  }
}
