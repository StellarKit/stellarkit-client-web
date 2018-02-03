<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>
          Enter your domain.
        </div>
      </div>
      <div class='help-email'>
        <v-text-field label="Domain" v-model.trim="domain" @keyup.native.enter="setDomain()" autofocus></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click.native="setDomain()" :loading="loadingLostLicense">Set Domain</v-btn>
          <span>Set the home domain</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
import StellarCommonMixin from '../components/StellarCommonMixin.js'

export default {
  props: ['ping', 'secretKey'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      visible: false,
      title: 'Set Home Domain',
      statusMessage: '',
      domain: '',
      loadingLostLicense: false
    }
  },
  watch: {
    ping: function () {
      this.visible = true
      this.domain = ''
    }
  },
  methods: {
    setDomain() {
      if (this.domain.length === 0) {
        this.statusMessage = 'Domain is blank'
      } else {
        this.loadingLostLicense = true

        this.statusMessage = 'Setting home domain...'

        this.su.setDomain(this.secretKey, this.domain)
          .then((result) => {
            this.debugLog(result)
            this.loadingLostLicense = false
            this.statusMessage = 'Success!'
          })
          .catch((error) => {
            this.debugLog(error)
            this.loadingLostLicense = false
            this.statusMessage = 'Error!'
          })
      }
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'lost')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .help-contents {
        // for the toast absolute
        position: relative;
        overflow: hidden;

        padding: 20px;
        font-size: 1.2em;

        flex: 1 1 auto;

        .help-text {
            div {
                margin-bottom: 10px;
            }
            margin-bottom: 20px;
        }

        .help-email {
            margin: 0 30px;
        }

        .button-holder {
            display: flex;
            justify-content: flex-end;
        }

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
