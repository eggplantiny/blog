<template>
  <button
    class="btn btn--primary"
    :class="classes"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'EButton',
  props: {
    color: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    classes () {
      const { color } = this
      const classes = []

      const colorClass = `btn--${color}`
      classes.push(colorClass)

      return classes
    }
  }
}
</script>

<style scoped lang="scss">
  .btn {
    @apply text-base font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-gray-900;
  }

  .btn--primary {
    @apply bg-red-400 text-white;
  }

  .btn--secondary {
    @apply bg-gray-100 text-black
  }

  .btn--normal {
    @apply bg-indigo-400 text-white
  }
</style>
