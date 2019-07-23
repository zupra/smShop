<template lang="pug">
.CartTotal
  | Итого: &nbsp;
  b {{totalQty}}&nbsp;
  | шт /&nbsp;
  b {{totalPrice}} &nbsp;
  | ₽
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalPrice: 'cart/totalPrice',
      totalQty: 'cart/totalQty'
    })
  }
}
</script>

<style lang="stylus">
.CartTotal
  font-size 1.2em
</style>
