<template lang="pug">

.Wrap
  h1 Dishes

  //- pre {{restaurants}}

  //-
  .flex_wr
    .Card.flex_col.m_2(
      v-for="Dish in dishes"
    )
      picture
        //- v-if="Dish.images.length"
        img(
          :src=" Dish.images.length ? `http://localhost:1337${Dish.images[0].url}` : `https://gradientjoy.com/400x300?id=${Dish.id}`"
        )
      h4 {{Dish.name}}
      p {{Dish.description}}
      p {{Dish.price}}


</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  data() {
    return {
      // restaurants: []
    }
  },
  // components: {}
  async asyncData({ app }) {
    const dishes = await strapi.request('post', '/graphql', {
      data: {
        query: `
        query {
          dishes {
            id
            name
            description
            price
            images {
              url
            }
          }
        }
        `
      }
    })
    return { ...dishes.data }
  }
  // async mounted() {
  //   await new Promise(resolve => setTimeout(() => resolve(), 10000))
  // }
}
</script>

<style lang="stylus"></style>
