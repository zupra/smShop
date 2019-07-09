<template lang="pug">
#layout
  #topNav.flex.x_sb.y_center
    .flex.x_se.fr
      NLink(
        to="/"
      ) HOME
      NLink(
        v-for="Item,idx in Nav"
        :key="idx"
        :to="Item.path"
      ) {{Item.name}}
    //- .btn.xl.green(
    //-   @click="showModal = true"
    //- ) Корзина {{totalQty}} / {{totalPrice}}

    // https://icongr.am/feather/shopping-cart.svg
    // https://icongr.am/material/cart-outline.svg
    //- transition(
    //-   name="cartUpdate"
    //-   :key="totalQty"
    //- )
    .CART.flex.y_start(
      @click="showModal=true"
    )
      svg(
        xmlns='http://www.w3.org/2000/svg', width='32', height='32', viewBox='0 0 24 24', fill='none', stroke='currentColor', stroke-width='2', stroke-linecap='round', stroke-linejoin='round'
      )
        circle(cx='9', cy='21', r='1')
        circle(cx='20', cy='21', r='1')
        path(d='M1 1h4l3 13a2 2 0 0 0 2 1.61h10a2 2 0 0 0 2-1.61L23 6H12')
      .CART_totalQty {{totalQty}}

  <nuxt />

  Modal(
    :show.sync="showModal"
    :position="modalPosition"
  )
    // slot="title"
    .flex.y_center(
      slot="title"
    ) 
      .btn.xl.outline.green(
        @click="modalPosition == 'toRight' ? modalPosition='toCenter' : modalPosition='toRight'"
        v-text="modalPosition == 'toRight' ? '« По центру' : 'Справа »'"
      )
    Cart

    //- slot="actions"
    .flex.x_sb.y_center(
      slot="actions"
    )
      .btn.xl.circle.green(
        @click="showModal = false; $router.push('/checkout')"
      ) Оформить

      .btn.xl.grey(
        @click="showModal = false"
      ) Закрыть
      
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '~/components/Modal/Modal.vue'
import Cart from '~/components/@Item/Cart.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Modal,
    Cart
  },
  data: () => ({
    showModal: false,
    modalPosition: 'toRight',
    // ['О ресторане','Меню','Новости','Галерея','Банкеты','Контакты']
    Nav: [
      {
        name: 'Меню',
        path: '/dishes'
      },
      {
        name: 'Новости',
        path: '#'
      },
      {
        name: 'Галерея',
        path: '#'
      },
      {
        name: 'Банкеты',
        path: '#'
      },
      {
        name: 'Контакты',
        path: '#'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      totalQty: 'cart/totalQty'
    })
  },

  async fetch({ store }) {
    const { data } = await strapi.request('post', '/graphql', {
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
    store.commit('cart/setItems', data.dishes)
  },

  methods: {
    ...mapMutations({
      addToCart: 'cart/addItem',
      minusItem: 'cart/minusItem',
      delItem: 'cart/delItem',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>

<style lang="stylus">
#topNav
  position fixed
  top 0
  left 0
  width 100%
  z-index 5
  height 3em
  padding 0 1em
  background #2a8ed1
  box-shadow 0 1px 8px rgba(0, 0, 0, .2), 0 3px 4px rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12)
  color #FFF
  a
    color #FFF

.CART
  cursor pointer
  &:hover
    svg
      stroke-width 3
    .CART_totalQty
      background #ff5722
  &_totalQty
    background #9b59b6
    width 2em
    height 2em
    border-radius 2em
    display flex
    justify-content center
    align-items center
</style>
