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
  </section>
</template>

<script>

import EList from '~/components/atoms/EList'
import EListItem from '~/components/atoms/EListItem'

export default {
  name: 'Root',
  components: {
    EList,
    EListItem
  },
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    console.log(articles)

    return {
      articles
    }
  }
}
</script>

<style scoped lang="scss">
  .layout {
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
  }

  .outlined {
    border: black solid 2px;
  }

  .card-transition {
    transition: margin-bottom 200ms, margin-top 200ms;
  }

  a {
    text-decoration: none;
  }
</style>
