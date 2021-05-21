<template>
  <ul class="divide-y divide-gray-100">
    <slot />
  </ul>
</template>

<script type="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EList'
})
</script>

<style scoped>

</style>
