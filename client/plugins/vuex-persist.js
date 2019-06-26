import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  return new VuexPersistence({
    // options
    key: 'cart',
    modules: ['cart']
    // storage: sessionStorage
  }).plugin(store)
}
