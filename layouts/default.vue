<template>
  <div>
    <e-app-bar />
    <nuxt />
  </div>
</template>

<script>

import EAppBar from '../components/atoms/AppBar/EAppBar'
export default {
  components: { EAppBar },
  data () {
    return {
      show: false
    }
  }
}
</script>
