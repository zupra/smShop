<template lang="pug">

.Wrap
  center
    span.brightStr В корзине 
      b {{totalQty}} 
      | шт / 
      b {{totalPrice}}
      |  ₽

  hr
  Cart
  hr
  label.field.mr_3
    input.xl(
      placeholder="ФИО"
    )
  label.field.mr_5
    input.xl(
      placeholder="address"
      v-model="address"
    )
  .btn.xl(
    @click="handleSubmit()"
  ) Отправить заказ


</template>

<script>
import Cart from '~/components/@Item/Cart.vue'
import { mapMutations, mapGetters } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Cart
  },
  data: () => ({
    address: ''
  }),
  computed: {
    ...mapGetters({
      inCart: 'cart/inCart',
      totalPrice: 'cart/totalPrice',
      totalQty: 'cart/totalQty'
    })
  },
  methods: {
    ...mapMutations({
      // addToCart: 'cart/addItem',
      // minusItem: 'cart/minusItem',
      // delItem: 'cart/delItem',
      // emptyCart: 'cart/emptyList'
    }),
    async handleSubmit() {
      // debugger
      try {
        await strapi.createEntry('orders', {
          address: this.address,
          amount: this.totalPrice,
          dishes: this.inCart
        })
        // alert('Your order have been successfully submitted.')
        // this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        // this.loading = false
        alert(err)
      }
    }
  }
}
</script>
