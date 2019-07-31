<template>
  <v-dialog persistent v-model="visible" scrollable @keydown.esc="visible = false" max-width="400">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false" />

      <div class="confirm-dialog-contents">
        <div class="main-message">{{message}}</div>
        <v-checkbox label="I understand" v-model="confirmed"></v-checkbox>

        <div class="button-holder">
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn round small v-on="on" @click="visible = false">Cancel</v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                round
                small
                color="error"
                v-on="on"
                @click="buttonClick('ok')"
                :disabled="!confirmed"
              >{{okTitle}}</v-btn>
            </template>
            <span>Confirm</span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { DialogTitleBar } from 'stellarkit-js-ui'

export default {
  props: ['ping', 'title', 'message', 'okTitle'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      visible: false,
      confirmed: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.confirmed = false
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
