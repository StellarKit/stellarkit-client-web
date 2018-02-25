<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='ledger-tab'>
    <div>
      <instructions-header>
        <div>Content coming soon...</div>
      </instructions-header>

      <div class='features-slider'>
        <div class='feature-nav'>
          <div class='feature-nav-title'>
            {{contentTitle}}
          </div>
        </div>

        <div v-if='tabIndex === 0' class='feature-box'>
          <ledger-feature1 />
        </div>

        <div v-else-if='tabIndex === 1' class='feature-box'>
          <ledger-feature2 :accountsUI='accountsUI' />
        </div>

        <div v-else-if='tabIndex === 2' class='feature-box'>
          <ledger-feature3 :accountsUI='accountsUI' />
        </div>

        <v-btn color='primary' @click='arrowClick(false)'>
          Back
        </v-btn>
        <v-btn color='primary' @click='arrowClick(true)'>
          Continue
        </v-btn>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../../components/StellarCommonMixin.js'
import AccountList from '../../components/AccountList.vue'
import LedgerFeature1 from '../../components/LedgerFeature1.vue'
import LedgerFeature2 from '../../components/LedgerFeature2.vue'
import LedgerFeature3 from '../../components/LedgerFeature3.vue'
import {
  LedgerAPI
} from 'stellar-js-utils'
import InstructionsHeader from '../../components/InstructionsHeader.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'ledger-feature1': LedgerFeature1,
    'ledger-feature2': LedgerFeature2,
    'ledger-feature3': LedgerFeature3,
    'account-list': AccountList,
    'instructions-header': InstructionsHeader
  },
  data() {
    return {
      tabIndex: 0,
      contentTitle: '',
      ledgerAPI: null
    }
  },
  mounted() {
    this.updateTabIndex(0)

    this.ledgerAPI = new LedgerAPI()
  },
  methods: {
    updateTabIndex(tabIndex) {
      this.tabIndex = tabIndex

      if (this.tabIndex > 2) {
        this.tabIndex = 0
      }
      if (this.tabIndex < 0) {
        this.tabIndex = 2
      }

      switch (this.tabIndex) {
        case 0:
          this.contentTitle = '#1: Create New Account for Ledger'
          break
        case 1:
          this.contentTitle = '#2: Give Ledger Signing Power'
          break
        case 2:
          this.contentTitle = '#3: Merge Account into Ledger'
          break
        default:
          this.contentTitle = 'unknown index'
          break
      }
    },
    arrowClick(right) {
      this.updateTabIndex(this.tabIndex + (right ? 1 : -1))
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../scss/styles.scss';

.ledger-tab {
    padding: 20px;

    .address-box {
        display: flex;
        align-items: center;
        div.input-group {
            margin-right: 16px;
        }
    }

    .feature-box {
        margin: 20px;
        padding: 20px;

        ol {
            margin-left: 20px;
            padding: 10px;
        }
    }

    .features-slider {
        background: rgba(0,0,0,.05);
        .feature-nav {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4em;

            .feature-nav-title {
                font-weight: bold;
                text-align: center;
            }
        }
    }
}
</style>
