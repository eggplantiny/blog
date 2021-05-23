<template>
  <div class="bg-indigo-900 container mx-auto">
    <e-app-bar />
    <div class="grid grid-cols-4 gap-4 relative">
      <div class="col-span-1 hidden md:block" />
      <div class="col-span-4 md:col-span-3">
        <nuxt />
      </div>
    </div>
    <e-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import EAppBar from '@/components/atoms/AppBar/EAppBar.vue'
import EFooter from '@/components/atoms/Footer/EFooter.vue'
import CategoryBar from '~/components/organisms/blog/CategoryBar.vue'

export default defineComponent({
  name: 'Default',
  components: {
    EAppBar,
    EFooter,
    CategoryBar
  }
})
</script>

<style scoped>

</style>
