<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='main-message'>
      {{message}}
    </div>
    <div class='button-holder'>
      <v-tooltip open-delay='200' bottom>
        <v-btn round small color='primary' slot="activator" @click="buttonClick('cancel')">Cancel</v-btn>
        <span>Cancel</span>
      </v-tooltip>
      <v-tooltip open-delay='200' bottom>
        <v-btn round small color='primary' slot="activator" @click="buttonClick('ok')">{{okTitle}}</v-btn>
        <span>Confirm</span>
      </v-tooltip>
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
      dddd: '',
    }
  },
  watch: {
    ping: function () {
      this.visible = true
    }
  },
  methods: {
    buttonClick(id) {
      switch (id) {
        switch (id) {
          case 'ok':
            this.visible = true
            break
          case 'cancel':
            this.visible = true
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .main-content {
        .main-message {
            // sdfsdf
        }
    }
}
</style>
