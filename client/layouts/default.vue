<template lang="pug">
#layout
  #topNav.flex.x_se.y_center
    a(
      v-for="Item in Nav"
      :href="Item.path"
    ) {{Item.name}}
    .btn(
      @click="showModal = true"
    ) Корзина {{totalQty}}/{{totalPrice}}
  <nuxt />

  Modal(:show.sync="showModal", position="rModal", title="Lorem ipsum dolor")
    ol
      li(
        v-for="Item in inCard"
      )
        small {{Item.name}}/q:{{Item.quantity}}
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
      totalPrice: 'card/price',
      inCard: 'card/items',
      totalQty: 'card/quantity'
    })
  },
  methods: {
    ...mapMutations({
      removeFromCard: 'card/remove',
      emptyCard: 'card/emptyList'
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
</style>
