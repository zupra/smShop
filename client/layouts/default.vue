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
    svg(
      xmlns='http://www.w3.org/2000/svg',
      viewBox='0 0 193.056 193.056',
      width="32" height="32",
      fill="mediumseagreen"
      @click="showModal = true"
    )
      path(d='M163.972,147.499H63.367l-2.13-8.714H175.25l16.571-72.198l-14.832-3.406l-13.863,60.387H57.893l-10.056-55.55L36.184,0H1.235v15.217h22.116l5.694,33.234l-0.211,0.038l16.351,90.298h0.383l2.214,9.049c-10.774,1.798-19.021,11.164-19.021,22.44c0,12.562,10.218,22.78,22.777,22.78c12.562,0,22.78-10.218,22.78-22.78c0-2.65-0.479-5.192-1.319-7.558h69.512c-0.837,2.369-1.319,4.91-1.319,7.558c0,12.562,10.216,22.78,22.775,22.78c12.562,0,22.78-10.218,22.78-22.78C186.754,157.718,176.534,147.499,163.972,147.499z M51.54,177.837c-4.17,0-7.56-3.393-7.56-7.563c0-4.167,3.391-7.558,7.56-7.558s7.563,3.394,7.563,7.558C59.103,174.446,55.71,177.837,51.54,177.837z M163.972,177.84c-4.169,0-7.558-3.393-7.558-7.563c0-4.167,3.391-7.558,7.558-7.558c4.172,0,7.563,3.393,7.563,7.558C171.537,174.446,168.144,177.84,163.972,177.84z')
    | {{totalQty}} &emsp;

  <nuxt />

  Modal(
    :show.sync="showModal"
    :position="modalPosition"
  )
    // slot="title"
    .flex.y_center(
      slot="title"
    ) 
      .btn.lg.blue(
        @click="modalPosition == 'toRight' ? modalPosition='toCenter' : modalPosition='toRight'"
        v-text="modalPosition == 'toRight' ? '« По центру' : 'Справа »'"
      )
    Cart

    .flex.x_sb.y_center(
      slot="actions"
    )
      
      .btn.blue.xl(
        @click="showModal = false; $router.push('/checkout')"
      ) Оформить

      .btn.blue.xl(
        @click="showModal = false"
      ) Закрыть
      
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '~/components/Modal/Modal.vue'
import Cart from '~/components/@Item/Cart.vue'

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
      totalQty: 'cart/quantity'
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
  background #FFF
  box-shadow 0 3px 5px 0 hsla(0, 0%, 60%, .2)
</style>
