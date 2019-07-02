<template lang="pug">

.Cart
  .CartList
    .CartItem.flex.y_center.x_sb(
      v-for="dish in inCart"
    )
      .fr_50.lh_1 {{dish.name}}
      | &nbsp;
      .bold {{dish.price}} ₽
      | &emsp;

      // Plus/Minus
      .flex.y_center
        .CartItem_qtyMinus(
          :disabled="dish.quantity === 1"
          @click="minusItem(dish)"
        )
        .CartItem_qtyResult {{dish.quantity}}
        .CartItem_qtyPlus(
          @click="addToCart(dish)"
        )
      | &emsp;
      .CartItem_itemTotalPrice {{dish.price * dish.quantity}} ₽

      | &emsp;
      //- .btn.uped.red(
      //-   @click="delItem(dish)"
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
            @click="delItem(dish); $el.click()"
          ) Удалить
  .CartTotal.flex.x_end.mt_3
    | Итого: &nbsp;
    b {{totalQty}}&nbsp;
    | шт /&nbsp;
    b {{totalPrice}} &nbsp;
    | ₽ &emsp;

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
    })
  }
}
</script>

<style lang="stylus">
// .Cart
.CartTotal
  font-size 1.4em

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
