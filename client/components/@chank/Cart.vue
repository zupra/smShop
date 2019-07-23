<template lang="pug">

.Cart
  .CartList
    .CartItem.flex.y_center.x_sb(
      v-for="Dish in inCart"
    )
      .fr_50.lh_1 {{Dish.name}}
      | &nbsp;
      .bold {{Dish.price}} ₽
      | &emsp;

      // Plus/Minus
      .flex.y_center
        .CartItem_qtyMinus(
          :disabled="Dish.quantity === 1"
          @click="(Dish.qty > 1) ? minusItem(Dish) : ''"
        )
        .CartItem_qtyResult {{Dish.qty}}
        .CartItem_qtyPlus(
          @click="addToCart(Dish)"
        )
      | &emsp;
      .CartItem_itemTotalPrice {{Dish.price * Dish.qty}} ₽

      | &emsp;
      //- .btn.uped.red(
      //-   @click="delItem(Dish)"
      //- ) ✖
      Dropdown(
        openTo="toLeft"
      )
        .btn.red._icon(
          slot="btn"
        )
          img(src="~static/icon/del.svg")
        .Dropdown_body
          p Удалить ?
          .sm.btn.fill.red(
            @click="delItem(Dish); $el.click()"
          ) Удалить
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  components: {
    Dropdown
  },
  computed: {
    ...mapGetters({
      inCart: 'cart/inCart'
    })
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/addItem',
      delItem: 'cart/delItem',
      minusItem: 'cart/minusItem'
      // emptyCart: 'cart/emptyList'
    })
  }
}
</script>

<style lang="stylus">
// .Cart


.CartItem
  padding .7em 0
  border-bottom 1px solid #EEE
  &_qtyMinus, &_qtyPlus
    width 1.2em
    height 1.2em
    border 1px solid #CCC
    cursor pointer
    &[disabled]
      background-color grey
  &_qtyMinus
    background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><line x1='0' y1='5' x2='10' y2='5' stroke='black'></line></svg>") center no-repeat
  &_qtyPlus
    background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><g stroke='black'><line x1='0' y1='5' x2='10' y2='5'></line><line x1='5' y1='0' x2='5' y2='10'></line></g></svg>") center no-repeat
  &_qtyResult
    width 1.8em
    text-align center
  &_itemTotalPrice
    width 4em
    text-align center
</style>
