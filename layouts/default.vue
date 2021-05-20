<template>
  <div>
    <e-app-bar />
    <nuxt />
  </div>
</template>

<script>

import EAppBar from '../components/atoms/EAppBar'
export default {
  components: { EAppBar },
  data () {
    return {
      show: false
    }
  }
}
</script>
