<template>
  <div class="px-4 h-16 flex justify-between items-center bg-indigo-500">
    <h3 class="font-bold text-white">
      Eggplantiny
    </h3>
    <div class="flex">
      <e-button @click="test">
        Accept
      </e-button>
    </div>
  </div>
</template>

<script>
import EButton from './EButton'
export default {
  name: 'EAppBar',
  components: { EButton },
  methods: {
    test () {
      alert('hello world')
    }
  }
}
</script>

<style scoped>

</style>
