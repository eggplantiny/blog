<template>
  <section class="px-4 text-white max-w-xl mx-auto">
    <template v-if="doc">
      <header>
        {{ doc.title }}
      </header>
      <div class="subtitle">
        {{ doc.subtitle }}
      </div>
      <div class="description">
        <div class="mb-1">
          📁 {{ doc.category }}
        </div>
        <div>
          📆 {{ timeFilter(doc.createdAt) }}
        </div>
      </div>
      <article class="mt-4">
        <nuxt-content
          :document="doc"
          class="content"
        />
      </article>
    </template>

    <article-footer
      :prev="prev"
      :next="next"
    />
  </section>
</template>

<script>
import { timeFilter } from '@/compositions/filter'
import ArticleFooter from '@/components/organisms/blog/Articles/ArticleFooter.vue'

export default {
  name: 'Article',
  components: {
    ArticleFooter
  },
  layout: 'blog',
  async asyncData (ctx) {
    const doc = await ctx.$content('articles', ctx.params.slug).fetch()

    const [prev, next] = await ctx.$content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(ctx.params.slug)
      .fetch()

    return {
      doc,
      prev,
      next
    }
  },
  methods: {
    timeFilter
  },
  head () {
    const doc = this.doc

    return {
      title: doc.title,
      meta: [
        { hid: 'description', name: 'description', content: doc.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: doc.title },
        { hid: 'og:description', property: 'og:description', content: doc.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: doc.title },
        { hid: 'twitter:description', name: 'twitter:description', content: doc.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/styles/content";

</style>
