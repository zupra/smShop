<template lang="pug">
.Wrap
  .flex
    div
      h1 Dishes
      .flex_wr.x_center
        .Dish.flex_col.m_2(
          v-for="Dish in dishes"
        )
          .IMG
            //-
            svg(
              viewBox="0 0 36 36"
              width="72" 
              height="72"
              fill="#FFF"
            ).IMG_icon
              use(xmlns:xlink='http://www.w3.org/1999/xlink', xlink:href='#icon-img')
          .m_2.mb_3
            h4.Dish_name {{Dish.name}}
            .lh_1.Dish_description {{Dish.description}}
            .flex.x_center.y_center
              i 100/150 гр
              | &emsp;
              b {{Dish.price}} ₽
              | &emsp;
              
              .btn.circle.orange(
                @click="$store.commit('cart/addItem', Dish)"
              ) Заказать


  //-
  svg(xmlns="http://www.w3.org/2000/svg", style="display: none")
    symbol(id="icon-img")
      path(d='M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 30V6h28v24z')
      path(d='M8.92 14a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4.6A1.6 1.6 0 1 1 7.33 11a1.6 1.6 0 0 1 1.59-1.59z')
      path(d='M22.78 15.37l-5.4 5.4-4-4a1 1 0 0 0-1.41 0L5.92 22.9v2.83l6.79-6.79L16 22.18l-3.75 3.75H15l8.45-8.45L30 24v-2.82l-5.81-5.81a1 1 0 0 0-1.41 0z')

</template>

<script>
import { mapMutations } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'

// import Modal from '~/components/Modal/Modal.vue'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  // data() {
  //   return {}
  // },
  // components: {
  //   Modal
  // },
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
          }
        }
        `
      }
    })
    return { ...dishes.data }
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/addItem'
    })
  }
}
</script>

<style lang="stylus">
.Dish
  background #FFF
  flex 2 0 250px
  transition box-shadow .3s, transform .3s
  box-shadow 0 1px 3px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12)
  &:hover
    box-shadow 0 4px 5px -2px rgba(0, 0, 0, .2), 0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 1px rgba(0, 0, 0, .12)
    transform translate(0, -4px)
  &_name
    height 2em
  &_description
    height 4em

.IMG
  background #CCC // #daae9b
  width 100% // 320px
  height 220px
  display flex
  &_icon
    margin auto
</style>
