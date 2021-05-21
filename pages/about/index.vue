<template>
  <section class="text-white px-2">
    <article>
      <nuxt-content
        :document="about"
        class="content"
      />
    </article>
  </section>
</template>

<script>
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'About',
  setup () {
    const { $content } = useContext()
    const about = useAsync(() => $content('about').fetch())

    return {
      about
    }
  }
})
</script>

<style scoped lang="scss">
@import "assets/styles/content";

</style>
