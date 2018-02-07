<template>
<div>
  <div class='info-area'>
    <div>1. Start with three accounts: Issuer, Distributor and Buyer
    </div>
    <v-btn class='create-accounts' small @click="createStandardAccounts()">Create Accounts</v-btn>

    <div>2. Click each button in order, but wait for each to complete</div>
  </div>
  <account-list :items="tokensUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='expansion-contents'>
    <v-expansion-panel class='custom-expansion-panel'>
      <v-expansion-panel-content v-bind:value="true">
        <div slot="header" class='expansion-title'>
          1. Distributor needs to trust the Issuer
        </div>
        <div class='expansion-message'>
          <v-btn small @click="setDistributorTrustToken()">Set Distributor Trust Token</v-btn>
          <div>Bifrost Only</div>
          <v-btn small @click="setDistributorTrustETH()">Set Distributor Trust ETC</v-btn>
          <v-btn small @click="setDistributorTrustBTC()">Set Distributor Trust BTC</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          2. Create tokens by sending assets from Issuer to Distributor
        </div>
        <div class='expansion-message'>
          <v-btn small @click="createTokens()">Create Tokens</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          3. Lock Issuer so more tokens can be created
        </div>
        <div class='expansion-message'>
          <div>Don't lock if using Bifrost, the current code fails when locked</div>
          <v-btn small @click="lockIssuer()">Lock Issuer</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          4. Post offer to exchange to sell tokens for XLM
        </div>
        <div class='expansion-message'>
          <v-btn small @click="manageOffer()">Manage Offer</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          5. Post offer to exchange to sell tokens for Ethereum
        </div>
        <div class='expansion-message'>
          <div>Bifrost Only</div>
          <v-btn small @click="manageOfferETH()">Manage Offer ETH</v-btn>
          <v-btn small @click="manageOfferBTC()">Manage Offer BTC</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          6. Buyer needs to trust the Distributor
        </div>
        <div class='expansion-message'>
          <v-btn small @click="setBuyerTrust()">Set Buyer Trust</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          7. Buy tokens
        </div>
        <div class='expansion-message'>
          <v-btn small @click="buyLamboTokens()">Buy Tokens</v-btn>
        </div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header" class='expansion-title'>
          8. Create new account from distributor, set trust, send tokens
        </div>
        <div class='expansion-message'>
          <div>Issues mulitiple operations. Wait for it to complete.</div>
          <v-btn small @click="newAccountWithTokens()">Create New Account</v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>

  <div class='bottom-buttons'>
    <v-btn small @click="showOffers()">Show Token Offers</v-btn>
    <v-btn small @click="deleteOffers()">Delete Token Offers</v-btn>
    <v-btn small @click="paymentPaths()">Payment Paths</v-btn>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import StellarAccounts from '../js/StellarAccounts.js'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      issuerAcct: null,
      distributorAcct: null,
      tokenBuyerAcct: null
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
        StellarUtils.newAccountWithTokens(distributorAccount.secret, '3', StellarAccounts.lamboTokenAsset(), '12')
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

      StellarUtils.buyTokens(this.tokenBuyerAcct.secret, StellarUtils.lumins(), StellarAccounts.lamboTokenAsset(), '1000', '2.22')
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

      const price = {
        n: 225,
        d: 1
      }

      StellarUtils.manageOffer(this.distributorAcct.secret, StellarUtils.lumins(), StellarAccounts.lamboTokenAsset(), '5000', price)
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

      StellarUtils.manageOffer(this.distributorAcct.secret, StellarAccounts.ethereumAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
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

      StellarUtils.manageOffer(this.distributorAcct.secret, StellarAccounts.bitcoinAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
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

      StellarUtils.lockAccount(this.issuerAcct.secret)
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

      StellarUtils.sendAsset(this.issuerAcct.secret, this.distributorAcct.publicKey, '10000', StellarAccounts.lamboTokenAsset(), 'Created Tokens')
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

      StellarUtils.changeTrust(this.distributorAcct.secret, asset, '10000')
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
      this.setDistributorTrust(StellarAccounts.btcAsset())
    },
    setBuyerTrust() {
      Helper.debugLog('Setting buyer trust...')

      // buyer must trust the distributor
      StellarUtils.changeTrust(this.tokenBuyerAcct.secret, StellarAccounts.lamboTokenAsset(), '10000')
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

          return null
        })
    },
    deleteOffersFromArray(offers) {
      const offer = offers.pop()
      if (offer) {
        const buying = StellarUtils.assetFromObject(offer.buying)
        const selling = StellarUtils.assetFromObject(offer.selling)

        StellarUtils.manageOffer(this.distributorAcct.secret, buying, selling, '0', offer.price_r, offer.id)
          .then((result) => {
            Helper.debugLog(result, 'Success')

            this.deleteOffersFromArray(offers)

            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    deleteOffers() {
      Helper.debugLog('Deleting Offers...')

      StellarUtils.server().offers('accounts', this.distributorAcct.publicKey)
        .call()
        .then((response) => {
          // Helper.debugLog(response)
          this.deleteOffersFromArray(response.records)
          return true
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

        StellarUtils.createTestAccount('Issuer', 'token')
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

        StellarUtils.createTestAccount('Distributor', 'token')
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

        StellarUtils.createTestAccount('Token buyer', 'token')
          .then((result) => {
            this.tokenBuyerAcct = result

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
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

.bottom-buttons {
    display: flex;
    justify-content: center;
}

.token-steps {
    padding: 20px 40px;
    background: rgba(0,0,0,.04);
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
            padding: 0 26px 10px;
        }
    }
}
</style>
