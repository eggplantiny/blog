<template>
  <section class="text-white px-2 max-w-xl mx-auto">
    <article>
      <nuxt-content
        :document="about"
        class="content"
      />
    </article>
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  name: 'About',
  async asyncData (ctx: Context) {
    const about = await ctx.$content('about').fetch()

    return {
      about
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/content";

</style>
