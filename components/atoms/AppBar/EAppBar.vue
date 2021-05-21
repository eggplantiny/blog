<template>
  <div class="px-4 h-16 bg-indigo-500 flex items-center">
    <div class="max-w-screen-md mx-auto w-full flex justify-between items-center">
      <h3 class="font-bold text-white">
        Eggplantiny
      </h3>
      <div class="flex">
        <e-button
          :text="true"
          @click="test"
        >
          About
        </e-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import EButton from '~/components/atoms/Button/EButton.vue'

export default defineComponent({
  name: 'EAppBar',
  components: { EButton },
  setup () {
    const test = () => {
      window.alert('hello world')
    }

    return {
      test
    }
  }
})
</script>

<style scoped>

</style>
