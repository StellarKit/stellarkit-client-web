<template>
<v-snackbar :timeout="4000" :bottom="bottom" :top="top" v-model="visible" :color='color' :absolute='absolute' :multi-line='multiline'>
  <div class='toast-text' v-html='snackbarMessage'></div>
</v-snackbar>
</template>

<script>
import Helper from '../js/helper.js'

export default {
  props: {
    location: {
      type: String,
      default: 'app'
    },
    absolute: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: true
    },
    top: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      snackbarMessage: '',
      color: 'success'
    }
  },
  methods: {
    toast(message, error = false) {
      this.snackbarMessage = message
      this.visible = true

      if (error) {
        this.color = 'error'
      } else {
        this.color = 'success'
      }
    },
    helperCallback(message, error, location) {
      if (this.location === location) {
        this.toast(message, error)
      }
    }
  },
  created() {
    Helper.vue().$on('toast', this.helperCallback)
  }
}
</script>

<style lang='scss' scoped>
// -------------------------

.toast-text {
    width: 100%;
    text-align: center;
}
</style>
