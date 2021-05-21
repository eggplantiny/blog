export const actions = {
  nuxtServerInit ({ dispatch }, { $content, route }) {
    dispatch('articles/fetchArticleList', { $content, route })
  }
}
