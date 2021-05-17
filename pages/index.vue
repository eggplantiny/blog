<template>
  <section>
    <template
      v-for="article of articles"
    >
      <nuxt-link
        :key="article.slug"
        :to="`/articles/${article.slug}`"
      >
        <h2>
          {{ article.title }}
        </h2>
        <div>
          {{ article.description }}
        </div>
      </nuxt-link>
    </template>
  </section>
</template>

<script>

export default {
  name: 'Root',
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
