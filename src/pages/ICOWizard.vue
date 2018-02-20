<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='page-title'>
    ICO Wizard
    <div class='page-subtitle'>
      Under Construction
    </div>
  </div>

  <div class='columns'>
    <wizard-view v-on:click-nav="clickWizardNav" :title='pageTitle'>
      <div slot='content'>
        <div v-if='pageIndex===0'>
          <div class='step-content'>
            Start by creating two accounts. You need a funding account to create the new accounts

            <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Funding accout" autocomplete return-object max-height="600"></v-select>

            <v-btn @click='createIssuer'>Create Issuer Account</v-btn>
            <v-btn @click='createDistributor'>Create Distributor Account</v-btn>
          </div>
        </div>
        <div v-if='pageIndex===1'>
          <div class='step-content'>
            Give your asset a symbol and create the tokens. Symbol can be 1-12 characters long

            <v-text-field label="Asset Symbol" v-model.trim="assetSymbol"></v-text-field>
            <v-text-field class='number-field' label="Amount" type='number' v-model.number="tokenAmount"></v-text-field>

            <v-btn @click='createTokens'>Create Tokens</v-btn>
            <div>Optional step. Lock issuer to prove that no more tokens can ever be created in the future.</div>
            <v-btn @click="lockIssuer">Lock Issuer</v-btn>

          </div>
        </div>
        <div v-if='pageIndex===2'>
          <div class='step-content'>
            Post offer to exchange to sell tokens for XLM. You can do this later if you're not ready to sell the tokens

            <div class='offer-price-fields'>
              <v-text-field class='number-field' label="Buy XLM" type='number' v-model.number="offerPriceN"></v-text-field>
              <v-text-field class='number-field' :label="'Sell ' +  assetSymbol" type='number' v-model.number="offerPriceD"></v-text-field>
              <v-text-field class='number-field' label="Amount to sell" type='number' v-model.number="offerAmount"></v-text-field>
            </div>

            <v-btn @click='createIssuer'>Post Sell Offer</v-btn>
          </div>
        </div>
      </div>
    </wizard-view>

    <div class='summary-view'>
      <div class='summary-header'>Token Information
        <v-spacer />
        <v-btn small icon>
          <v-icon>&#xE8AD;</v-icon>
        </v-btn>
      </div>
      <div class='operations-item' v-for="key in Array.from(summaryMap.keys())" :key=key>
        <div class='item-name'>
          {{key}}:
        </div>
        <div class='item-value'>
          {{summaryMap.get(key)}}
        </div>
      </div>
      </summary-view>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import WizardView from '../components/WizardView.vue'
const StellarSdk = require('stellar-sdk')

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'wizard-view': WizardView
  },
  data() {
    return {
      pageIndex: 0,
      numberOfPages: 3,
      pageTitle: '',
      tokenAmount: 0,
      selectedSource: null,
      assetSymbol: '',
      issuerKeypair: null,
      distributorKeypair: null,
      offerPriceN: 10,
      offerPriceD: 1,
      offerAmount: 10000,
      pageTitles: [
        'Create Accounts',
        'Create Asset',
        'Set Trust',
        'Create Tokens',
        'Manage Offer'
      ]
    }
  },
  computed: {
    summaryMap: function () {
      const result = new Map()

      result.set('Symbol', this.assetSymbol)
      result.set('Amount', this.tokenAmount)

      if (this.issuerKeypair) {
        result.set('Issuer', this.issuerKeypair.publicKey())
        result.set('Issuer Secret', this.issuerKeypair.secret())
      }
      if (this.distributorKeypair) {
        result.set('Distributor', this.distributorKeypair.publicKey())
        result.set('Distributor Secret', this.distributorKeypair.secret())
      }

      return result
    }
  },
  mounted() {
    this.updatePageIndex(0)
  },
  methods: {
    createTokens() {
      // set distributor trust
    },
    lockIssuer() {
      // ===
    },
    createIssuer() {
      this.issuerKeypair = StellarSdk.Keypair.random()
    },
    createDistributor() {
      this.distributorKeypair = StellarSdk.Keypair.random()
    },
    updatePageIndex(tabIndex) {
      this.pageIndex = tabIndex

      if (this.pageIndex >= this.numberOfPages) {
        this.pageIndex = 0
      }
      if (this.pageIndex < 0) {
        this.pageIndex = this.numberOfPages - 1
      }

      this.pageTitle = 'Step ' + (this.pageIndex + 1) + ': ' + this.pageTitles[this.pageIndex]
    },
    clickWizardNav(id) {
      switch (id) {
        case 'previous':
          this.updatePageIndex(this.pageIndex - 1)
          break
        case 'next':
          this.updatePageIndex(this.pageIndex + 1)
          break
        default:
          console.log('click not handled')
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.columns {
    display: flex;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;

    .left-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
        margin-right: 20px;
    }
    .right-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
    }

    .summary-view {
        margin: 10px;
        padding: 0 20px;

        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        background: rgba(0,0,0,.02);
        background: rgba(0,0,30,.05);
        box-shadow: 0 6px 13px -4px rgba(0,0,0,.3);
        border: solid 1px rgba(0,0,0,.02);

        .summary-header {
            display: flex;
            font-weight: bold;
            font-size: 1.1em;
            text-transform: uppercase;
            align-items: center;
            justify-content: center;
        }

        .operations-item {
            display: flex;

            &:nth-child(odd) {
                background: rgba(0, 0, 0, .04);
            }

            .item-name {
                text-align: right;
                padding-right: 5px;
                font-weight: bold;
                flex: 1 0 20%;
            }

            .item-value {
                text-align: left;
                flex: 1 0 50%;
                padding-left: 5px;
            }
        }
    }

    .number-field {
        max-width: 200px;
        margin-right: 12px;
    }
}
</style>
