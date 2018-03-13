<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="400">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='confirm-dialog-contents'>
      <div class='main-message'>
        {{message}}
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small slot="activator" @click="visible = false">Cancel</v-btn>
          <span>Cancel</span>
        </v-tooltip>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='error' slot="activator" @click="buttonClick('ok')">{{okTitle}}</v-btn>
          <span>Confirm</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</v-dialog>
</template>

<script>
import {
  DialogTitleBar
} from 'stellar-js-utils'

export default {
  props: ['ping', 'title', 'message', 'okTitle'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
    }
  },
  methods: {
    buttonClick(id) {
      switch (id) {
        case 'ok':
          this.visible = false
          this.$emit('confirm-dialog-ok')
          break
        case 'cancel':
          this.visible = false
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .confirm-dialog-contents {
        @include inner-dialog-contents();

        .main-message {
            font-size: 0.9em;
            margin-bottom: 10px;
        }
    }
}
</style>
