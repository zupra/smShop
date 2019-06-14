<template lang="pug">

.wrap
  h1 HELLO
  pre {{$data}}

</template>

<script>
const apiUrl = process.env.API_URL || 'http://localhost:1337'
export default {
  // components: {}
  data() {
    return {}
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.$get(`${apiUrl}/restaurants`)
    return {
      data
    }
  }
}
</script>

<style></style>
