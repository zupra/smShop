<template lang="pug">
div
  pre {{currItem}}
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
  h3.mt_3 {{currItem && currItem.name}}
  div {{currItem && currItem.description}}
  
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
  computed: {
    currItem() {
      return this.arrItems[this.currIdx]
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

<test_TS>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Product from '../../models/Product'
@Component
export default class ProductItem extends Vue {
  @Prop({ type: Array, required: true }) arrItems!: Product[]
  @Prop({ type: Number, default: 0 }) itemIdx!: number
  currIdx = this.itemIdx
  @Watch('itemIdx')
  onItemIdxChanged(val: number) {
    this.currIdx = val
  }
}
</test_TS>
