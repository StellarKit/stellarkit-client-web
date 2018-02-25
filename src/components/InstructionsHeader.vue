<template>
<div class='instructions-header'>
  <v-btn flat class='tiny-button' @click="slotVisible = !slotVisible">Help
    <v-icon>&#xE5C5;</v-icon>
  </v-btn>
  <div v-if='slotVisible' class='slot-hider'>
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      slotVisible: false
    }
  },
  methods: {
    horizonMetrics() {
      // sdfsdf
    }
  }
}
</script>

<style lang='scss' scoped>
.instructions-header {
    background: rgba(0,0,0,.02);
    button {
        height: 30px;
        margin: 0;
    }
    border-bottom: solid 1px rgba(0,0,0,.08);

    .slot-hider {
        margin: 8px 20px;
    }
}
</style>
