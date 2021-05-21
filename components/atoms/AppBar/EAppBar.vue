<template>
  <div class="px-4 h-16 bg-indigo-900 flex justify-between items-center">
    <h3 class="font-bold text-white">
      Eggplantiny
    </h3>
    <div class="flex">
      <template v-for="(button, index) in buttons">
        <nuxt-link
          :key="index"
          :to="button.to"
        >
          <e-button
            :text="true"
          >
            {{ button.label }}
          </e-button>
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import EButton from '~/components/atoms/Button/EButton.vue'

export default defineComponent({
  name: 'EAppBar',
  components: { EButton },
  setup () {
    const buttons = ref([
      {
        to: '/',
        label: 'Home'
      },
      {
        to: '/blog',
        label: 'Blog'
      },
      {
        to: '/about',
        label: 'About'
      }
    ])

    return {
      buttons
    }
  }
})
</script>

<style scoped>

</style>
