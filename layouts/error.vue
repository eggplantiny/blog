<template>
  <div class="text-white">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <h2>
      {{ error.message }}
    </h2>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '페이지를 찾을 수 없습니다.',
      otherError: '에러가 발생했습니다.'
    }
  },
  head () {
    const title = 'Error'
    return {
      title
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  @apply text-2xl mb-4;
}
</style>
