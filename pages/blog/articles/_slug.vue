<template>
  <section class="px-4 text-white">
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
import { defineComponent, useContext, useAsync, useRoute } from '@nuxtjs/composition-api'
import { timeFilter } from '@/compositions/filter'

export default defineComponent({
  layout: 'blog',
  setup () {
    const { $content } = useContext()
    const route = useRoute()

    const doc = useAsync(() => $content('articles', route.value.params.slug).fetch())

    return {
      doc,
      timeFilter
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../../assets/styles/content";

</style>
