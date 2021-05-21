<template>
  <div class="bg-indigo-900 container mx-auto">
    <e-app-bar />
    <div class="grid grid-cols-4 gap-4 relative">
      <div class="col-span-1 invisible md:visible">
        <category-bar />
      </div>
      <div class="col-span-4 md:col-span-3">
        <nuxt />
      </div>
    </div>
    <e-footer />
  </div>
</template>

<script lang="ts">

import EAppBar from '@/components/atoms/AppBar/EAppBar'
import CategoryBar from '@/components/organisms/CategoryBar'
import EFooter from '@/components/atoms/Footer/EFooter.vue'

export default {
  components: {
    EAppBar,
    CategoryBar,
    EFooter
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
