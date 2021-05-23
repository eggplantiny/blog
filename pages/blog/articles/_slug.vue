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
        <div>
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
  </section>
</template>

<script lang="ts">
// import { defineComponent, useContext, useAsync, useRoute } from '@nuxtjs/composition-api'
import { timeFilter } from '@/compositions/filter'

export default {
  layout: 'blog',
  async asyncData (ctx: Context): Promise<object | void> | object | void {
    const doc = await ctx.$content('articles', ctx.params.slug).fetch()

    return {
      doc
    }
  },
  methods: {
    timeFilter
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/styles/content";

</style>