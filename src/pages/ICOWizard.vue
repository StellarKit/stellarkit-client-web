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
    <wizard-view v-on:click-nav="clickWizardNav" v-on:menu-nav="wizardMenuNav" :title='pageTitle' :numPages='numberOfPages' :currentPage='pageIndex' :pageTitles="pageTitles">
      <div slot='content'>
        <transition v-on:enter="animateEnter" v-on:leave="animateLeave" v-bind:css="false" mode='out-in'>
          <div v-if='pageIndex===0' key='0'>
            <div class='step-content'>
              Start by creating two accounts. You need a funding account to create the new accounts

              <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Funding accout" autocomplete return-object max-height="600"></v-select>

              <v-btn @click='createIssuer'>Create Issuer Account</v-btn>
              <v-btn @click='createDistributor'>Create Distributor Account</v-btn>
            </div>
          </div>
          <div v-if='pageIndex===1' key='1'>
            <div class='step-content'>
              Give your asset a symbol and create the tokens. Symbol can be 1-12 characters long

              <v-text-field label="Asset Symbol" v-model.trim="assetSymbol"></v-text-field>
              <v-text-field class='number-field' label="Amount" type='number' v-model.number="tokenAmount"></v-text-field>

              <v-btn @click='createTokens'>Create Tokens</v-btn>
              <div>Optional step. Lock issuer to prove that no more tokens can ever be created in the future.</div>
              <v-btn @click="lockIssuer">Lock Issuer</v-btn>

            </div>
          </div>
          <div v-if='pageIndex===2' key='2'>
            <div class='step-content'>
              Post offer to exchange to sell tokens for XLM. You can do this later if you're not ready to sell the tokens

              <div class='offer-price-fields'>
                <v-text-field label="Token name" v-model.trim="tokenName"></v-text-field>
                <v-text-field label="Token  description" v-model.trim="tokenDescription"></v-text-field>
                <v-text-field label="Token conditions" v-model.trim="tokenConditions"></v-text-field>
              </div>
              <v-btn @click='publishTokenInformation'>Publish Token Information </v-btn>
            </div>
          </div>
          <div v-if='pageIndex===3' key='3'>
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
        </transition>
      </div>
    </wizard-view>

    <div class='summary-view'>
      <div class='summary-header'>Token Information
        <v-spacer />
        <v-btn small icon @click='printInfo'>
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
import StyleExtractionMixin from '../components/StyleExtractionMixin.js'
import AccountList from '../components/AccountList.vue'
import WizardView from '../components/WizardView.vue'
const StellarSdk = require('stellar-sdk')
const $ = require('jquery')
import {
  TweenMax,
  Power2
} from 'gsap'

export default {
  mixins: [StellarCommonMixin, StyleExtractionMixin],
  components: {
    'account-list': AccountList,
    'wizard-view': WizardView
  },
  data() {
    return {
      pageIndex: 0,
      numberOfPages: 4,
      pageTitle: '',
      tokenAmount: 0,
      selectedSource: null,
      assetSymbol: '',
      issuerKeypair: null,
      distributorKeypair: null,
      offerPriceN: 10,
      offerPriceD: 1,
      offerAmount: 10000,
      tokenName: '',
      tokenDescription: '',
      tokenConditions: '',
      reverseTransition: false,
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
    printInfo() {
      this.printTokenInfo($('.summary-view'))
    },
    animateEnter(el, done) {
      let width = $('.wizard-main').outerWidth() / 4

      if (this.reverseTransition) {
        width *= -1
      }

      TweenMax.set(el, {
        x: width,
        autoAlpha: 0
      })
      TweenMax.to(el, 0.2, {
        autoAlpha: 1,
        x: 0,
        ease: Power2.easeIn,
        onComplete: done
      })
    },
    animateLeave(el, done) {
      let width = $('.wizard-main').outerWidth() / 4

      if (this.reverseTransition) {
        width *= -1
      }

      TweenMax.to(el, 0.1, {
        autoAlpha: 0,
        x: -width,
        ease: Power2.easeOut,
        onComplete: done
      })
    },
    publishTokenInformation() {
      // ==
    },
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
    wizardMenuNav(index) {
      this.updatePageIndex(index)
    },
    clickWizardNav(id) {
      switch (id) {
        case 'previous':
          this.reverseTransition = true
          this.updatePageIndex(this.pageIndex - 1)
          break
        case 'next':
          this.reverseTransition = false
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
    flex-wrap: wrap;

    .left-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
    }
    .right-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
    }

    .summary-view {
        margin: 10px;

        display: flex;
        flex: 0 1 auto;
        flex-direction: column;

        .summary-header {
            display: flex;
            font-weight: bold;
            font-size: 1.1em;
            text-transform: uppercase;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        .operations-item {
            display: flex;
            font-size: 0.95em;

            .item-name {
                text-align: right;
                padding-right: 5px;
                font-weight: bold;
                flex: 1 0 20%;
            }

            .item-value {
                text-align: left;
                flex: 1 0 80%;
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
