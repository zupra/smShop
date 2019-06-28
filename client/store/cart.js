// import Cookies from 'js-cookie'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  addItem(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (!record) {
      state.items.push({
        quantity: 1,
        ...item
      })
    } else {
      record.quantity++
    }
    // Cookies.set('card', state.items)
  },
  minusItem(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.items.findIndex(i => i.id === item.id)
      state.items.splice(index, 1)
    }
    // Cookies.set('card', state.items)
  },
  delItem(state, item) {
    const index = state.items.findIndex(i => i.id === item.id)
    state.items.splice(index, 1)
  },
  emptyList(state) {
    state.items = []
    // Cookies.set('card', state.items)
  }
}

export const getters = {
  items: state => {
    return state.items
  },
  price: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    )
  },
  quantity: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    )
  }
}
