<template>
  <div>
    <div class="z-10 w-30 fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <nuxt-link
        to="/blog"
        class="text-white font-bold text-4xl hover:text-indigo-100 transition-colors"
      >
        Hello, I'm eggplantiny
      </nuxt-link>
    </div>
    <canvas
      ref="canvas"
      id="canvas"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from '@nuxtjs/composition-api'
import ParticleEffect from '@/canvas/particles-effect/app.js'

export default defineComponent({
  name: 'Index',
  layout: 'home',
  setup () {
    const particleEffect = ref<ParticleEffect | null>(null)

    onMounted(() => {
      const canvas = document.getElementById('canvas')
      particleEffect.value = new ParticleEffect(canvas)
    })

    onBeforeUnmount(() => {
      particleEffect.value?.destroy()
    })
  },
  head () {
    return {
      title: 'blog',
      meta: [
        { hid: 'description', name: 'description', content: 'blog' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'blog' },
        { hid: 'og:description', property: 'og:description', content: 'blog' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'blog' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'blog' }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
  #canvas {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 0;
  }
</style>
