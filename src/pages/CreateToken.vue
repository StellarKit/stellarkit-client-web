<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <div class='info-area'>
    <div>1. Start with three accounts: Issuer, Distributor and Buyer
    </div>
    <v-btn round class='create-accounts' small @click="createStandardAccounts()">Create Accounts</v-btn>

    <div>2. Click each button in order, but wait for each to complete</div>
  </div>
  <div class='expansion-contents'>
    <v-expansion-panel class='custom-expansion-panel'>
      <v-expansion-panel-content v-bind:value="true">
        <div slot="header" class='expansion-title'>
          1. Distributor needs to trust the Issuer of asset
        </div>
        <div class='expansion-message'>
          <v-text-field class='number-field' label="Asset trust limit" type='number' v-model.trim="trustLimit"></v-text-field>

          <v-btn round @click="setDistributorTrustToken()">Set Distributor Trust Token</v-btn>
          <div class='message-comment'>Only needed for Bifrost</div>
          <v-btn round @click="setDistributorTrustETH()">Set Distributor Trust ETC</v-btn>
          <v-btn round @click="setDistributorTrustBTC()">Set Distributor Trust BTC</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          2. Create tokens by sending assets from Issuer to Distributor
        </div>
        <div class='expansion-message'>
          <v-text-field class='number-field' label="Amount to create" type='number' v-model.trim="createAmount" @keyup.enter="buttonClick('createTokens')"></v-text-field>
          <v-btn round @click="createTokens()">Create Tokens</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          3. Lock Issuer so more tokens can be created
        </div>
        <div class='expansion-message'>
          <div class='message-comment'>Don't lock if using Bifrost, the current code fails when locked</div>
          <v-btn round @click="lockIssuer()">Lock Issuer</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          4. Post offer to exchange to sell tokens for XLM
        </div>
        <div class='expansion-message'>
          <strong>Price:</strong>
          <div class='offer-price-fields'>
            <v-text-field class='number-field' label="Buy XLM" type='number' v-model="offerPriceN"></v-text-field>
            <v-text-field class='number-field' label="Sell LMB" type='number' v-model="offerPriceD"></v-text-field>
            <v-text-field class='number-field' label="Amount to sell" type='number' v-model="offerAmount"></v-text-field>
          </div>

          <v-btn round @click="manageOffer()">Manage Offer</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          5. Post offer to exchange to sell tokens for ETC/BTC
        </div>
        <div class='expansion-message'>
          <div class='message-comment'>Bifrost Only</div>
          <v-btn round @click="manageOfferETH()">Manage Offer ETH</v-btn>
          <v-btn round @click="manageOfferBTC()">Manage Offer BTC</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          6. Buyer needs to trust the Distributor
        </div>
        <div class='expansion-message'>
          <v-text-field class='number-field' label="Asset trust limit" type='number' v-model.trim="trustLimit"></v-text-field>

          <v-btn round @click="setBuyerTrust()">Set Buyer Trust</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          7. Buy tokens
        </div>
        <div class='expansion-message'>
          <v-text-field class='number-field' label="Amount to buy" type='number' v-model.trim="amountToBuy"></v-text-field>

          <v-btn round @click="buyLamboTokens()">Buy Tokens</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          8. Create new account from distributor, set trust, send tokens
        </div>
        <div class='expansion-message'>
          <div class='message-comment'>Issues mulitiple operations. Wait for it to complete.</div>
          <v-btn round @click="newAccountWithTokens()">Create New Account</v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>

  <div class='bottom-buttons'>
    <v-btn round @click="showOffers()">Show Token Offers</v-btn>
    <v-btn round @click="deleteOffers()">Delete Token Offers</v-btn>
    <v-btn round @click="paymentPaths()">Payment Paths</v-btn>
    <v-btn round @click="orderbook()">Order book</v-btn>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import StellarAccounts from '../js/StellarAccounts.js'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      issuerAcct: null,
      distributorAcct: null,
      tokenBuyerAcct: null,
      createAmount: 10000,
      trustLimit: 10000,
      amountToBuy: 12.4,
      offerPriceN: 10,
      offerPriceD: 1,
      offerAmount: 2500
    }
  },
  components: {
    'account-list': AccountList
  },
  mounted() {
    this.createStandardAccounts()
  },
  methods: {
    newAccountWithTokens() {
      const distributorAccount = this.distributorAccount()

      if (distributorAccount) {
        StellarUtils.newAccountWithTokens(StellarWallet.secret(distributorAccount.secret), '3', StellarAccounts.lamboTokenAsset(), '12')
          .then((result) => {
            Helper.debugLog(result.account)

            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    buyLamboTokens() {
      Helper.debugLog('Buying tokens..')

      StellarUtils.buyTokens(StellarWallet.secret(this.tokenBuyerAcct.secret), StellarUtils.lumins(), StellarAccounts.lamboTokenAsset(), '5000', String(this.amountToBuy))
        .then((response) => {
          Helper.debugLog(response)

          StellarUtils.updateBalances()

          return null
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    paymentPaths() {
      Helper.debugLog('payment paths..')

      StellarUtils.paths(this.distributorAccount.publicKey, this.tokenBuyerAcct.publicKey, StellarAccounts.lamboTokenAsset(), '1')
        .then((response) => {
          Helper.debugLog(response, 'Success')

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    manageOffer() {
      Helper.debugLog('Managing Offer...')

      // parseInt shouldn't be necessary, but if you edit the textfields, it changes to a string
      const price = {
        n: parseInt(this.offerPriceN),
        d: parseInt(this.offerPriceD)
      }

      StellarUtils.manageOffer(StellarWallet.secret(this.distributorAcct.secret), StellarUtils.lumins(), StellarAccounts.lamboTokenAsset(), String(this.offerAmount), price)
        .then((result) => {
          Helper.debugLog(result, 'Success')

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    manageOfferETH() {
      Helper.debugLog('Managing offer Ethereum...')

      const price = {
        n: 1,
        d: 10
      }

      StellarUtils.manageOffer(StellarWallet.secret(this.distributorAcct.secret), StellarAccounts.ethereumAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
        .then((result) => {
          Helper.debugLog(result, 'Success')

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    manageOfferBTC() {
      Helper.debugLog('Managing offer Bitcoin...')

      const price = {
        n: 1,
        d: 10
      }

      StellarUtils.manageOffer(StellarWallet.secret(this.distributorAcct.secret), StellarAccounts.bitcoinAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
        .then((result) => {
          Helper.debugLog(result, 'Success')

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    lockIssuer() {
      Helper.debugLog('Locking issuer...')

      StellarUtils.lockAccount(StellarWallet.secret(this.issuerAcct.secret))
        .then((result) => {
          Helper.debugLog('locked!')
          Helper.debugLog(result)

          return null
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    createTokens() {
      Helper.debugLog('Creating tokens...')

      const amount = this.createAmount
      if (amount < 1) {
        Helper.debugLog('Create token amount must be greater than 0', 'Error')
        return
      }

      StellarUtils.sendAsset(StellarWallet.secret(this.issuerAcct.secret), this.distributorAcct.publicKey, String(amount), StellarAccounts.lamboTokenAsset(), 'Created Tokens')
        .then((response) => {
          Helper.debugLog(response, 'Success')

          StellarUtils.updateBalances()

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    setDistributorTrust(asset) {
      Helper.debugLog('Setting distributor trust...')

      StellarUtils.changeTrust(StellarWallet.secret(this.distributorAcct.secret), asset, String(this.trustLimit))
        .then((result) => {
          Helper.debugLog(result)

          return null
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    setDistributorTrustToken() {
      this.setDistributorTrust(StellarAccounts.lamboTokenAsset())
    },
    setDistributorTrustETH() {
      this.setDistributorTrust(StellarAccounts.ethereumAsset())
    },
    setDistributorTrustBTC() {
      this.setDistributorTrust(StellarAccounts.bitcoinAsset())
    },
    setBuyerTrust() {
      Helper.debugLog('Setting buyer trust...')

      // buyer must trust the distributor
      StellarUtils.changeTrust(StellarWallet.secret(this.tokenBuyerAcct.secret), StellarAccounts.lamboTokenAsset(), String(this.trustLimit))
        .then((result) => {
          Helper.debugLog(result)

          return null
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    showOffers() {
      Helper.debugLog('Offers...')

      StellarUtils.server().offers('accounts', this.distributorAcct.publicKey)
        .call()
        .then((response) => {
          response.records.forEach((offer) => {
            Helper.debugLog(offer)
          })

          Helper.debugLog('Offers done')

          return null
        })
    },
    deleteOffersFromArray(offers) {
      return new Promise((resolve, reject) => {
        const offer = offers.pop()
        if (offer) {
          const buying = StellarUtils.assetFromObject(offer.buying)
          const selling = StellarUtils.assetFromObject(offer.selling)

          StellarUtils.manageOffer(StellarWallet.secret(this.distributorAcct.secret), buying, selling, '0', offer.price_r, offer.id)
            .then((result) => {
              Helper.debugLog(result, 'Success')

              resolve(this.deleteOffersFromArray(offers))
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')

              reject(error)
            })
        } else {
          resolve(true)
        }
      })
    },
    deleteOffers() {
      Helper.debugLog('Deleting Offers...')

      StellarUtils.server().offers('accounts', this.distributorAcct.publicKey)
        .call()
        .then((response) => {
          // Helper.debugLog(response)
          return this.deleteOffersFromArray(response.records)
        })
        .then((result) => {
          Helper.debugLog('Deleted all offers', 'Success')
          return result
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
          return false
        })
    },
    createStandardAccounts() {
      this.issuerAcct = StellarAccounts.accountWithName('Issuer')
      if (!this.issuerAcct) {
        Helper.debugLog('Creating Issuer...')

        StellarUtils.createTestAccount('Issuer')
          .then((result) => {
            this.issuerAcct = result

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }

      this.distributorAcct = StellarAccounts.accountWithName('Distributor')
      if (!this.distributorAcct) {
        Helper.debugLog('Creating Distributor...')

        StellarUtils.createTestAccount('Distributor')
          .then((result) => {
            this.distributorAcct = result

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }

      this.tokenBuyerAcct = StellarAccounts.accountWithName('Token buyer')
      if (!this.tokenBuyerAcct) {
        Helper.debugLog('Creating Token buyer...')

        StellarUtils.createTestAccount('Token buyer')
          .then((result) => {
            this.tokenBuyerAcct = result

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
    },
    orderbook() {
      Helper.debugLog('Orderbook...')

      // const selling = StellarUtils.lumins()
      // const buying = StellarAccounts.lamboTokenAsset()

      const selling = StellarAccounts.lamboTokenAsset()
      const buying = StellarUtils.lumins()

      StellarUtils.server().orderbook(selling, buying)
        .call()
        .then((response) => {
          Helper.debugLog(response)
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    }
  }
}
</script>

<style scoped lang='scss'>
.info-area {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    align-items: center;
    font-weight: bold;

    .create-accounts {
        position: absolute;
        top: 0;
        right: 0;
    }
}

.offer-price-fields {
    display: flex;
    max-width: 400px;
}

.number-field {
    max-width: 200px;
    margin-right: 12px;
}

.bottom-buttons {
    display: flex;
    justify-content: center;
}

.token-steps {
    padding: 20px 40px;
    background: rgba(0,0,0,.04);
}

.message-comment {
    font-size: 1.1em;
    margin-left: 8px;
}

.expansion-contents {
    padding: 10px 20px;
    text-align: left;

    overflow-y: auto;
    font-size: 1em;

    .custom-expansion-panel {
        .expansion-title {
            text-align: left;
            font-weight: bold;
        }
        .expansion-message {
            font-size: 0.9em;
            padding: 0 42px 10px;
            background: rgba(0,0,0,.025);
            border-top: solid 1px rgba(0,0,0,.05);
        }
    }
}
</style>
