<template>
  <e-list class="sticky top-0">
    <template
      v-for="(category, index) in categories"
    >
      <e-list-item
        :key="index"
        @click="onClickItem(category)"
      >
        {{ category }}
      </e-list-item>
    </template>
  </e-list>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

import EList from '@/components/atoms/List/EList.vue'
import EListItem from '@/components/atoms/List/EListItem.vue'

export default defineComponent({
  name: 'CategoryBar',
  components: {
    EList,
    EListItem
  },
  setup () {
    const store = useStore()
    const categories = store.getters['articles/categories']
    const onClickItem = (item: string) => window.alert(`hello ${item}`)

    return {
      categories,
      onClickItem
    }
  }
})
</script>

<style scoped>

</style>
