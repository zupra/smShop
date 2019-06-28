<template lang="pug">

.Wrap
  h1 restaurants

  //- pre {{restaurants}}

  //-
    .flex_wr
      .Card.flex_col.m_3(
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
// import Strapi from 'strapi-sdk-javascript/build/main'
// const apiUrl = process.env.API_URL || 'http://localhost:1337'
// const strapi = new Strapi(apiUrl)
export default {
  data() {
    return {
      // restaurants: []
    }
  },
  // components: {}
  async asyncData({ app }) {
    /*
    const restaurants = await app.$axios.$get(`${apiUrl}/restaurants`)
    return {
      restaurants
    }
    

    const restaurants = await strapi.request('post', '/graphql', {
      data: {
        query: `
        query {
          restaurants {
            id,
            name,
            description,
            images {
              url
            }
          }
        }
        `
      }
    })
    return { ...restaurants.data }
    */
  },
  async mounted() {
    await new Promise(resolve => setTimeout(() => resolve(), 10000))
  }
}
</script>

<style lang="stylus"></style>
