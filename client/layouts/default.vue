<template lang="pug">
#layout
  #topNav.flex.x_sb.y_center
    .flex.x_se.fr
      a(
        v-for="Item in Nav"
        :href="Item.path"
      ) {{Item.name}}
    .btn.xl.uped.green(
      @click="showModal = true"
    ) Корзина {{totalQty}} / {{totalPrice}}
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
        @click="modalPosition == 'rModal' ? modalPosition='Y_center' : modalPosition='rModal'"
        v-text="modalPosition == 'rModal' ? '« По центру' : 'Справа »'"
      )
      | &emsp;
      span.brightStr В корзине 
        b {{totalQty}} 
        | шт / 
        b {{totalPrice}}
        |  ₽
    
    .DISHES_inCart
      .dishInCart.mx_2.flex.y_center.x_sb(
        v-for="dish in inCart"
      )
      
        .fr_50.lh_1 {{dish.name}}
        | &nbsp;
        .bold {{dish.price}}₽
        | &nbsp;
        .fr.flex.y_center
          .btn.uped(
            @click="removeFromCart(dish)"
          ) -
          span.m_1 {{dish.quantity}}
          .btn.uped(
            @click="addToCart(dish)"
          ) +
        | &emsp;
        .btn.uped.red(
          @click="delItem(dish)"
        ) ✖

      
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Modal from '~/components/Modal/Modal.vue'
export default {
  components: {
    Modal
  },
  data: () => ({
    showModal: false,
    modalPosition: 'rModal',
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
      totalPrice: 'cart/price',
      inCart: 'cart/items',
      totalQty: 'cart/quantity'
    })
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      delItem: 'cart/del',
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
  background #fff
  box-shadow 0 5px 7px 0 hsla(0, 0%, 60%, .2)

.DISHES_inCart
  max-height 50vh
  overflow-y scroll

.dishInCart
  padding .5em 0
  &+&
    border-top 1px solid #CCC
</style>
