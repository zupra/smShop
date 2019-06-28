<template lang="pug">

.Wrap

  span.brightStr В корзине 
    b {{totalQty}} 
    | шт / 
    b {{totalPrice}}
    |  ₽

  hr

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
          @click="minusItem(dish)"
        ) -
        span.m_1 {{dish.quantity}}
        .btn.uped(
          @click="addToCart(dish)"
        ) +
      | &emsp;
      .btn.uped.red(
        @click="delItem(dish)"
      ) ✖

  hr

  label.field
    input.xl(
      v-model="address"
    )

  .btn(
    @click="handleSubmit()"
  ) handleSubmit



</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  // components: {},
  data: () => ({
    address: ''
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
      addToCart: 'cart/addItem',
      minusItem: 'cart/minusItem',
      delItem: 'cart/delItem',
      emptyCart: 'cart/emptyList'
    }),
    async handleSubmit() {
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
