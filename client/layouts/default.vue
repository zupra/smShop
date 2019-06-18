<template lang="pug">
#layout
  #topNav.flex.x_se.y_center
    a(
      v-for="Item in Nav"
      :href="Item.path"
    ) {{Item.name}}
  <nuxt />

</template>

<script>
export default {
  data: () => ({
    // ['О ресторане','Меню','Новости','Галерея','Банкеты','Контакты']
    Nav: [
      // {
      //   name: 'О ресторане',
      //   path: '#'
      // },
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
  })
}
</script>

<style lang="stylus">
html
  font-family "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  /*
  font-size: 16px;
  word-spacing: 1px;
  */
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box

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
