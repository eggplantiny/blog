<template>
  <section class="max-w-screen-md mx-auto">
    <e-list>
      <template
        v-for="article of articles"
      >
        <nuxt-link
          :key="article.slug"
          :to="`/articles/${article.slug}`"
        >
          <e-list-item>
            <h2 class="text-xl font-bold">
              {{ article.title }}
            </h2>
            <div>
              {{ article.description }}
            </div>
          </e-list-item>
        </nuxt-link>
      </template>
    </e-list>
    <e-card />
  </section>
</template>

<script lang="ts">

import EList from '~/components/atoms/List/EList.vue'
import EListItem from '~/components/atoms/List/EListItem.vue'
import ECard from '~/components/atoms/Card/ECard.vue'

export default {
  name: 'Root',
  components: {
    ECard,
    EList,
    EListItem
  },
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles
    }
  }
}
</script>

<style scoped lang="scss">
</style>
