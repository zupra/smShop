<template lang="pug">
.Modal-rootOverlay(
  v-show='show', 
  @click.self='close'
)
  .Modal-Card(:class='[position]')
    .title(v-if='title') {{ title }}
    .slot_Title(v-if='$slots.title')
      slot(name='title')
    .body
      slot
    .actions
      slot(name='actions')
        button.btn.blue.xl(
          @click='close'
        ) Закрыть

</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'toCenter'
      // validator: prop => ['toCenter', 'toRight'].includes(prop)
    }
  },
  watch: {
    show(isShow) {
      document.body.style.cssText = isShow
        ? 'height:100vh;overflow:hidden;'
        : ''
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
      // document.body.style = ''
    }
  }
}
</script>

<style lang="stylus">
$bg = #f1f1f1

.Modal
  &-rootOverlay
    z-index 100
    position fixed
    left 0
    top 0
    width 100% // 100vw
    height 100vh
    display flex
    cursor pointer
    background rgba(#444 .7)
    overflow hidden
    overflow-y overlay // auto
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
  &-Card
    // reset rootOverlay
    cursor auto
    background #FFF

.Modal-Card
  .title
    font-size 1.4rem
    line-height 1.3
    padding .75rem 1.5rem
    // border-radius .2em 0 0
  .slot_Title
    padding 1rem
  .body
    padding 1rem 1.5rem
    background #fbfcfd //#f7f7f7
    box-shadow: 0 0 1em #CCC inset;
    // line-height 1.2rem
  .actions
    // padding: .75rem 1.5rem 1.2rem
    text-align right
    padding 1rem 1.2rem
  &.toCenter
    margin auto
    border-radius .2em
    width 90%
    max-width 780px
    transform scale(.5)
    opacity 0
    animation anim_toCenter .3s cubic-bezier(.25, .46, .45, .94) forwards // ease-in


  &.toRight
    // overflow overlay
    // padding 0 1em 1em
    max-width 460px
    // FIX
    // align-self start
    // min-height 100%
    animation anim_toRight .1s .3s cubic-bezier(.25, .46, .45, .94) forwards // ease-in
    margin-left auto
    transform translateX(100%)

@keyframes anim_toCenter
  to
    transform scale(1)
    opacity 1

@keyframes anim_toRight
  to
    transform translateX(0)
</style>
