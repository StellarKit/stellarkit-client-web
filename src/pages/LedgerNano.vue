<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='ledger-tab'>

    <div>
      <div class='instructions'>
        <div class='title-instructions'>
          <strong>Fun with Ledger Nano</strong>
        </div>
        <div>
          (under construction)
        </div>
      </div>

      <v-btn round @click="connectToLedger()">Connect to Ledger</v-btn>

      <div class='features-slider'>
        <div class='feature-nav'>
          <v-btn icon color='primary' @click='arrowClick(false)'>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-spacer />
          <div class='feature-nav-title'>
            Create New Account For Ledger
          </div>
          <v-spacer />
          <v-btn icon color='primary' @click='arrowClick(true)'>
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>

        <div v-if='tabIndex === 0' class='feature-box'>
          <div>
            Create an additional Stellar account that can be controlled by your Ledger. You don't need multiple Ledgers to create multipe Stellar accounts! You also don't have to worry about keeping an additional secret keys safe.
          </div>

          <div> This feature will:
            <ol>
              <li>
                Create a new account.
              </li>
              <li>
                1 XLM will be sent from your ledger to the new account. This is required to create new accounts on Stellar.
              </li>
              <li>
                Add your ledger as a signer on this new account.
              </li>
              <li>
                Set the 'master' key on the account to 0 disabling the original accounts ability to sign any transactions.
              </li>
              <li>
                This is 'reversible' using the merge account feature below.
              </li>
            </ol>
          </div>

          <div>
            will create a new account, disable the new accounts secret key and will add your Ledger as a signer on the new account. for your ledger account for all operations. Now you can send coins to that account and withdrawl from that account with ease. Your
            ledger's master account is not touched, you are creating a new account that can be signed by your ledger's key. For example, you have a high balance account where you store the majority of your coins and you would like a few smaller balance
            accounts where you can store just a few coins for daily usage.
          </div>

          <v-btn round @click="createNewAccount()">Create New Account for Ledger</v-btn>
        </div>

        <div v-else-if='tabIndex === 1' class='feature-box'>
          <div>
            Add your ledger as a signer to an existing account
          </div>

          <div class='address-box'>
            <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
          </div>

          <v-btn round @click="giveLedgerSigningPower()">Give Ledger Signing Power</v-btn>
        </div>

        <div v-else-if='tabIndex === 2' class='feature-box'>
          <div>
            Merge an account into your Ledger account deleting the source account. If you made an account and then changed your mind, just merge it back in. Any balance on the source account will be added to your Ledgers account.
          </div>

          <div>
            This is reversible if you just send XLM to that account that is now empty
          </div>

          <div class='address-box'>
            <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
          </div>

          <v-btn round @click="mergeAccountIntoLedger()">Merge Account into Ledger</v-btn>
        </div>
      </div>

    </div>

  </div>
</div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import Helper from '../js/helper.js'
// import StellarAccounts from '../js/StellarAccounts.js'
// import StellarUtils from '../js/StellarUtils.js'
// const StellarSdk = require('stellar-sdk')
// import {
//   StellarWallet
// } from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList
  },
  data() {
    return {
      selectedSource: null,
      tabIndex: 0
    }
  },
  methods: {
    createNewAccount() {
      // sdf
    },
    giveLedgerSigningPower() {
      // sdf
    },
    mergeAccountIntoLedger() {
      // sdf
    },
    arrowClick(right) {
      this.tabIndex += right ? 1 : -1

      if (this.tabIndex > 2) {
        this.tabIndex = 0
      }
      if (this.tabIndex < 0) {
        this.tabIndex = 2
      }
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
    }
  }
}
</script>

<style scoped lang='scss'>
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

    .instructions {
        text-align: center;

        .title-instructions {
            font-weight: bold;
            font-size: 1.2em;
        }
        div {
            margin-bottom: 12px;
            line-height: 1;
        }
    }
}
</style>
