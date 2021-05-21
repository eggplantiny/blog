<template>
  <img
    class="w-full"
    :data-src="src"
    src="static/images/placeholder.png"
  />
</template>

<script>
export default {
  name: 'Image',
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
