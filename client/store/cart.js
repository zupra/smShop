import Vue from 'vue'
export const state = () => ({
  items: [],
  numberUpdate_dir: 'Up'
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  addItem(state, item) {
    state.numberUpdate_dir = 'Up'
    item.qty ? item.qty++ : Vue.set(item, 'qty', +1)
  },
  minusItem(state, item) {
    state.numberUpdate_dir = 'Down'
    item.qty -= 1
  },
  delItem(state, item) {
    Vue.delete(item, 'qty')
  }
}

export const getters = {
  items: state => {
    return state.items
  },
  inCart: state => {
    return state.items.filter(i => i.qty)
  },
  totalQty: (state, { inCart }) => {
    return inCart.reduce((n, inCart) => inCart.qty + n, 0)
  },
  totalPrice: (state, { inCart }) => {
    return inCart
      .reduce((n, inCart) => inCart.price * inCart.qty + n, 0)
      .toFixed(2)
  }
}
