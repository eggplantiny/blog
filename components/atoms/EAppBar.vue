<template>
  <div class="px-4 h-16 flex justify-between items-center bg-indigo-500">
    <h3 class="font-bold text-white">
      Eggplantiny
    </h3>
    <div class="flex">
      <e-button
        color="red"
        @click="test"
      >
        Accept
      </e-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import EButton from '@/components/atoms/EButton'

export default defineComponent({
  name: 'EAppBar',
  components: { EButton },
  setup () {
  }
})
</script>

<style scoped>

</style>
