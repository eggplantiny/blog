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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  setup (props) {
    const { color, dark, text, size } = props

    const classes = reactive([...generateColorClass(color, dark, text), `btn--size--${size}`])

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
  .btn {
    @apply text-base font-medium rounded-lg focus:outline-none transition-colors select-none;
  }

  .btn--size--normal {
    @apply px-4 py-2;
  }

  .btn--size--small {
    @apply px-2 py-1 text-sm;
  }
</style>
