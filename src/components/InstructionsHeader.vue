<template>
<div>
  <div class='instructions-header'>
    <v-btn
      dark
      flat
      class='tiny-button'
      @click="slotVisible = !slotVisible"
    >Help
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <div class='centered-title'>
      {{pageTitle}}
    </div>
    <div
      class='experiments-button'
      @click='showExperiments'
    ></div>
  </div>
  <div
    v-if='slotVisible'
    class='slot-hider'
  >
    <slot></slot>
  </div>
</div>
</template>

<script>
import Helper from '../js/helper.js'

export default {
  data() {
    return {
      slotVisible: false
    }
  },
  computed: {
    pageTitle: function() {
      return this.$route.name
    }
  },
  methods: {
    showExperiments() {
      Helper.emit('enable-experiments')
    }
  }
}
</script>

<style lang='scss' scoped>
.instructions-header {
    position: relative;
    background: darken(steelblue, 4%);
    display: flex;

    button {
        height: 30px;
        margin: 0;
    }

    .centered-title {
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(255,255,255,.8);
        font-weight: bold;
        font-size: 1.1em;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .experiments-button {
        width: 30px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        flex: 0 0 auto;
    }
}

.slot-hider {
    padding: 8px 20px;
}
</style>
