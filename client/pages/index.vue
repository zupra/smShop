<template lang="pug">

.Wrap
  h1 categories
  
  .btn.uped(
    v-for="Item in categories"
    @click="selectСategory(Item.id)"
  ) {{Item.name}}
  //- pre {{categories}}

  pre {{category}}

</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  data() {
    return {
      // currCategory: null
      category: null // {}
    }
  },
  // components: {}
  async asyncData({ app }) {
    const categories = await strapi.request('post', '/graphql', {
      data: {
        query: `
        query {
          categories {
            id,
            name
          }
        }
        `
      }
    })
    return { ...categories.data }
  },
  methods: {
    async selectСategory(id) {
      const category = await strapi.request('post', '/graphql', {
        data: {
          query: `
            query {
              category(id: "${id}") {
                name
                dishes {
                  name
                  description
                  price
                }
              }
            }
            `
        }
      })
      this.category = { ...category.data }
    }
  }
}
</script>

<style lang="stylus"></style>
