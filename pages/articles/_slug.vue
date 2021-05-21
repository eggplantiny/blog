<template>
  <section class="max-w-xl mx-auto text-white">
    <header>
      {{ title }}
    </header>
    <article>
      <nuxt-content
        :document="doc"
        class="content"
      />
    </article>
  </section>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    console.log(params.slug)
    const doc = await $content('articles', params.slug).fetch()

    const title = doc.title
    const subtitle = doc.subtitle

    return {
      doc,
      title,
      subtitle
    }
  },
  beforeMount () {
    this.height = window.innerHeight
    window.addEventListener('resize', () => {
      this.height = window.innerHeight
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {})
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/content";

</style>
