<template>
  <div class="flex rounded-xl p-8 md:p-0">
    <div class="w-40 h-40 relative">
      <template v-if="background">
        {{/* image */}}
      </template>
    </div>
    <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p class="text-lg font-semibold">
          “Tailwind CSS is the only framework that I've seen scale
          on large teams. It’s easy to customize, adapts to any design,
          and the build size is tiny.”
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">
          Sarah Dayan
        </div>
        <div class="text-gray-500">
          Staff Engineer, Algolia
        </div>
      </figcaption>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ECard',
  props: {
    background: {
      type: String | null,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
