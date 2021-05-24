<template>
  <section class="text-white px-2 max-w-2xl mx-auto">
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
  },
  head () {
    return {
      title: 'about',
      meta: [
        { hid: 'description', name: 'description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'eggplantiny - about' },
        { hid: 'og:description', property: 'og:description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'eggplantiny - about' },
        { hid: 'twitter:description', name: 'twitter:description', content: '안녕하세요. 개발자 정성우의 블로그입니다.' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/content";

</style>
