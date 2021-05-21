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
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { generateColorClass } from '@/compositions/classes'

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
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { color, dark, text } = props

    const classes = reactive([...generateColorClass(color, dark, text)])

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
  .btn {
    @apply text-base font-medium rounded-lg px-4 py-2 focus:outline-none transition-colors;
  }
</style>
