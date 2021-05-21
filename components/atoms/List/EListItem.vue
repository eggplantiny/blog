<template>
  <li
    class="p-4 flex space-x-4 mx-auto"
    :class="classes"
  >
    <div class="relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20 text-white hover:text-indigo-200 transition-colors tracking-wide leading-8">
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EListItem',
  setup (_, { listeners }) {
    const classes = []
    if (listeners && listeners.click) {
      classes.push('cursor-pointer')
    }

    return {
      classes: reactive(classes)
    }
  }
})
</script>

<style scoped>

</style>
