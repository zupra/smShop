<template lang="pug">

.Wrap
  h1 restaurants

  //- pre {{restaurants}}

  .flex_wr
    .Card.flex_col.Restauran(
      v-for="Restaurant in restaurants"
    )
      picture
        img(
          :src="`http://localhost:1337${Restaurant.images[0].url}`"
        )
      h4 {{Restaurant.name}}
      
      NLink(
        :to="`/restaurants/${Restaurant.id}`"
      ) goTo



</template>

<script>
const apiUrl = process.env.API_URL || 'http://localhost:1337'
export default {
  data() {
    return {
      restaurants: []
    }
  },
  // components: {}
  async asyncData({ app }) {
    // console.log('asyncData')
    const restaurants = await app.$axios.$get(`${apiUrl}/restaurants`)
    // await new Promise(resolve => setTimeout(() => resolve(), 2000))
    return {
      restaurants
    }
  },
  async mounted() {
    await new Promise(resolve => setTimeout(() => resolve(), 10000))
  }
}
</script>

<style lang="stylus">

.Restauran
  margin: 1em;
  // &_name
  // &_description
</style>
