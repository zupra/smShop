<template lang="pug">
.Wrap

  .flex.x_center
    each clr in ['#f1c40f','#e67e22','#e74c3c','#9b59b6','#3498db','#2ecc71', '#ecf0f1', '#7f8c8d']
      .UIclr
        .UIclr_pick(style="background-color:"+clr)
        .UIclr_val #{clr}
        .flex(class="_"+clr.slice(1))
          each to in ['toLite','toBlack']
            div(class=""+to)
              each item in [1,2,3,4,5]
                div

  h1 size/mod
  h2 outline
  each clr in ['BASE','red','green','orange']
    div
      each size in ['xl','lg','','sm']
        .m_1(class=`btn outline ${clr} ${size}`) #{clr} #{size}


  h2 outline circle
  each clr in ['BASE','red','green','orange']
    div
      each size in ['xl','lg','','sm']
        .m_1(class=`btn outline circle ${clr} ${size}`) #{clr} #{size}

  h2 filled
  each clr in ['BASE','red','green','orange']
    div
      each size in ['xl','lg','','sm']
        .m_1(class=`btn ${clr} ${size}`) #{clr} #{size}


  h2 Icon
  each clr in ['','red','green','orange']
    div
      each size in ['xl','lg','','sm']
        .m_1.btn._icon(class=`${clr} ${size}`)
          img(src="~static/icon/del.svg")

  each clr in ['','red','green','orange']
    div
      each size in ['xl','lg','','sm']
        .m_1.btn._icon.outline.circle(class=`${clr} ${size}`)
          //- img(src="~static/icon/del.svg")

</template>
<style lang="stylus">
// ==== <PALETTE =====
.UIclr
  margin 1em
  text-align center
  box-shadow 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12)
  width 6em
  &_pick
    height 4em

toLite(clr)
  for num in (0 .. 5)
    &:nth-child({num})
      background clr + (10 * num)%

toBlack(clr)
  for num in (0 .. 5)
    &:nth-child({num})
      background clr - 10 * num // (10*num)%

setClr(clr)
  .toLite
    div
      toLite(clr)
  .toBlack
    div
      toBlack(clr)

.toLite, .toBlack
  width 50%
  div
    height 1em

colors = { _f1c40f: #f1c40f, _e67e22: #e67e22, _e74c3c: #e74c3c, _9b59b6: #9b59b6, _3498db: #3498db, _2ecc71: #2ecc71, _ecf0f1: #ecf0f1, _7f8c8d: #7f8c8d }

for K, V in colors
  .{K}
    setClr(V)
</style>
