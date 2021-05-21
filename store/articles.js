
export const state = () => ({
  articleList: [],
  selectedCategory: null
})

export const mutations = {
  SET_ARTICLE_LIST (state, items) {
    state.articleList.splice(0, state.articleList.length)
    state.articleList.push(...items)
  },
  SET_SELECTED_CATEGORY (state, item) {
    state.selectedCategory = item
  }
}

export const actions = {
  async fetchArticleList ({ commit }, { $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author', 'category', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()
    commit('SET_ARTICLE_LIST', articles)
  },
  setSelectedCategory ({ commit }, category) {
    commit('SET_SELECTED_CATEGORY',category)
  }
}

export const getters = {
  articles: state => state.articleList,
  categories: state => Array.from(state.articleList.reduce((categorySet, { category }) =>
    // eslint-disable-next-line no-mixed-operators
    categorySet.add(category) || categorySet, new Set()).values()
  ).filter(category => category)
}
