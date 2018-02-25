<template>
<div>
  <div class='instructions-header'>
    <v-btn dark flat class='tiny-button' @click="slotVisible = !slotVisible">Help
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <div class='centered-title'>
      {{pageTitle}}
    </div>
  </div>
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
  computed: {
    pageTitle: function () {
      return this.$route.name
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
    position: relative;
    background: darken(steelblue, 4%);

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
}

.slot-hider {
    padding: 8px 20px;
}
</style>
