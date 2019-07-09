<template lang="pug">
div
  //- pre {{arrItems[currIdx]}}
  .IMG(
    style="height:400px"
  )
    svg(
      viewBox="0 0 36 36"
      width="72" 
      height="72"
      fill="#FFF"
    ).IMG_icon
      use(xmlns:xlink='http://www.w3.org/1999/xlink', xlink:href='#icon-img')
  h3.mt_3 {{arrItems[currIdx].name}}
  div {{arrItems[currIdx].description}}
  
  //- .btn(
  //-   @click="prev"
  //- ) prev

  //- .btn(
  //-   @click="next"
  //- ) next
  
</template>
<script>
export default {
  props: {
    arrItems: {
      type: Array,
      required: true
    },
    itemIdx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currIdx: this.itemIdx
    }
  },
  watch: {
    itemIdx(newVal) {
      this.currIdx = newVal
    }
  }
  /*
  computed: {
    maxIdx() {
      return this.arrItems.length - 1
    }
  },
  methods: {
    prev() {
      // this.transition_name = 'slide_prev'
      this.currIdx = this.currIdx ? this.currIdx - 1 : this.maxIdx
    },
    next() {
      // this.transition_name = 'slide_next'
      this.currIdx = this.currIdx >= this.maxIdx ? 0 : this.currIdx + 1
    }
  }
  */
}
</script>
