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
      .CART_totalQty
        transition(:name="`updateNumber${numberUpdate_dir}`")
          b(:key="totalQty") {{totalQty}}
        

  <nuxt />

  Modal(
    :show.sync="showModal"
    :position="modalPosition"
  )
    // slot="title"
    .flex.y_center.x_sb(
      slot="title"
    ) 
      .btn.xl.outline.green(
        @click="modalPosition == 'toRight' ? modalPosition='toCenter' : modalPosition='toRight'"
        v-text="modalPosition == 'toRight' ? '« По центру' : 'Справа »'"
      )
      CartTotal.brightStr

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
import { mapState, mapGetters, mapMutations } from 'vuex'
import Modal from '~/components/Modal/Modal.vue'
import Cart from '~/components/@chank/Cart.vue'
import CartTotal from '~/components/@chank/CartTotal.vue'
// import Strapi from 'strapi-sdk-javascript/build/main'
// const apiUrl = process.env.API_URL || 'http://localhost:1337'
// const strapi = new Strapi(apiUrl)

export default {
  components: {
    Modal,
    Cart,
    CartTotal
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
    ...mapState('cart', { numberUpdate_dir: state => state.numberUpdate_dir }),
    ...mapGetters({
      totalQty: 'cart/totalQty'
    })
  },

  // async fetch({ store }) {
  //   const { data } = await strapi.request('post', '/graphql', {
  //     data: {
  //       query: `
  //       query {
  //         dishes {
  //           id
  //           name
  //           description
  //           price
  //         }
  //       }
  //       `
  //     }
  //   })
  //   store.commit('cart/setItems', data.dishes)
  // },

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

topNav_black()
  background #2a8ed1
  box-shadow 0 1px 8px rgba(0, 0, 0, .2), 0 3px 4px rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12)
  color #FFF
  a
    color #FFF
#topNav
  position fixed
  top 0
  left 0
  width 100%
  z-index 5
  height 3em
  padding 0 1em
  font-size 1.2rem
  line-height 1

  background rgba(#FFF, .94)
  box-shadow: 0 1px 8px rgba(0,0,0,.25);


.CART
  cursor pointer
  &:hover
    svg
      stroke-width 3
      stroke: darkgoldenrod;
    .CART_totalQty
      background #ff5722
  &_totalQty
    width 2em
    height 2em
    border-radius 2em
    display flex
    justify-content center
    align-items center

    background #e94a35 // #9b59b6
    color #FFF

.updateNumberUp-enter-active
  animation updateNumber_up .3s

.updateNumberDown-enter-active
  animation updateNumber_down .3s

.updateNumberUp-leave-active, .updateNumberDown-leave-active
  opacity 0
  position absolute

@keyframes updateNumber_up
  from
    opacity 0
    transform translate3d(0, .7em, 0)
  to
    opacity 1
    transform translate3d(0, 0, 0)

@keyframes updateNumber_down
  from
    opacity 0
    transform translate3d(0, -.7em, 0)
  to
    opacity .8
    transform translate3d(0, 0, 0)
</style>
