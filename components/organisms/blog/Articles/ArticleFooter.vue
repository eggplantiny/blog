<template>
  <div class="sm:flex justify-between items-center py-4">
    <template v-if="prev">
      <link-button
        class="text-left"
        prefix="<"
        :label="prev.title"
        :to="prev.slug"
      />
    </template>
    <template v-else>
      <div class="no-item">
        😅 이전글이 없습니다
      </div>
    </template>

    <template v-if="next">
      <link-button
        class="text-right"
        suffix=">"
        :label="next.title"
        :to="next.slug"
      />
    </template>
    <template v-else>
      <div class="no-item">
        다음글이 없습니다 😅
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import LinkButton from '@/components/molecules/Button/LinkButton'

import EButton from '@/components/atoms/Button/EButton'

export default defineComponent({
  name: 'ArticleFooter',
  components: {
    EButton,
    LinkButton
  },
  props: {
    prev: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    }
  }
})
</script>

<style scoped lang="scss">
.no-item {
  @apply text-sm text-center hover:bg-red-400 cursor-auto rounded px-2 py-1 transition-colors select-none;
}

</style>
