<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    @draw="draw">
    <div v-text="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick () {
      global.alert('Well done.')
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style>
.sample {
  width: 240px;
  background: white;
  overflow: hidden;
  color: black;
  text-align: center;
  position: absolute;
}
.sample.active {
  background: white;
  color: black;
}
</style>
