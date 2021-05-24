<template>
  <section class="max-w-xl mx-auto">
    <e-list>
      <template
        v-for="article of articles"
      >
        <nuxt-link
          :key="article.slug"
          :to="`/blog/articles/${article.slug}`"
        >
          <e-list-item>
            <h2 class="text-xl font-bold">
              {{ article.title }}
            </h2>
            <p>
              {{ article.subtitle }}
            </p>
            <p class="text-right font-thin text-sm">
              {{ timeFilter(article.createdAt) }}
            </p>
          </e-list-item>
        </nuxt-link>
      </template>
    </e-list>
  </section>
</template>

<script lang="ts">

import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { timeFilter } from '~/compositions/filter'
import EList from '~/components/atoms/List/EList.vue'
import EListItem from '~/components/atoms/List/EListItem.vue'

export default defineComponent({
  name: 'Root',
  layout: 'blog',
  components: {
    EList,
    EListItem
  },
  setup () {
    const store = useStore()
    const articles = store.getters['articles/articles']
    const categories = store.getters['articles/categories']

    return {
      articles,
      categories,
      timeFilter
    }
  },
  head () {
    return {
      title: 'blog',
      meta: [
        { hid: 'description', name: 'description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'eggplantiny - home' },
        { hid: 'og:description', property: 'og:description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'eggplantiny - home' },
        { hid: 'twitter:description', name: 'twitter:description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
</style>
