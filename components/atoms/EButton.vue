<template>
  <button
    class="btn"
    :class="classes"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { colorClass } from '@/compositions/classes'

export default defineComponent({
  name: 'EButton',
  props: {
    color: {
      type: String,
      default: 'indigo'
    },
    dark: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const { color, dark } = props

    return {
      classes: colorClass(color, dark)
    }
  }
})
</script>

<style scoped lang="scss">
  .btn {
    @apply text-base font-medium rounded-lg px-4 py-2 focus:outline-none transition-colors;
  }
</style>
