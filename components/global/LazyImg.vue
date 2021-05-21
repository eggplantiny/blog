<template>
  <img
    class="w-full"
    :data-src="src"
    alt=""
    src="static/images/placeholder.png"
  />
</template>

<script>
export default {
  name: 'LazyImg',
  props: {
    src: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped>

</style>
