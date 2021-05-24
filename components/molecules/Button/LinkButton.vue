<template>
  <nuxt-link
    :to="to"
    class="flex hover:bg-indigo-400 transition-colors rounded"
    v-bind="$attrs"
  >
    <e-button text size="small" class="w-full sm:px-4 sm:py-2 sm:text-lg">
      {{ prefix }} {{ label }} {{ suffix }}
    </e-button>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import EButton from '@/components/atoms/Button/EButton.vue'

export default defineComponent({
  name: 'LinkButton',
  components: {
    EButton
  },
  props: {
    to: {
      type: String,
      default: '/'
    },
    label: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>

</style>
