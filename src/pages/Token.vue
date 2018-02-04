<template>
<div>
  <div class="info-area">
    Start with three accounts: Issuer, Distributor and Buyer<br>
    <v-btn small @click="createAccounts()">Create Accounts</v-btn>
    <br>
    <h3>Accounts - Click for info</h3>
    <account-list :items="tokensUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  </div>

  <div>Click each button in order, but wait for each to complete
  </div>
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

  <v-btn small @click="showOffers()">Show Token Offers</v-btn>
  <v-btn small @click="deleteOffers()">Delete Token Offers</v-btn>
  <v-btn small @click="paymentPaths()">Payment Paths</v-btn>
  <v-btn small @click="buyerInfo()">Buyer Info</v-btn>

</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import StellarAccounts from '../js/StellarAccounts.js'
const StellarSdk = require('stellar-sdk')

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
    this.createAccounts()
  },
  methods: {
    newAccountWithTokens() {
      const keypair = StellarSdk.Keypair.random()

      this.debugLog('New Account:')
      this.debugLog(keypair.publicKey())
      this.debugLog(keypair.secret())

      this.su.createAccount(this.distributorAcct.secret, keypair.publicKey(), '3')
        .then((newAccount) => {
          this.debugLog(newAccount)
          this.su.changeTrust(keypair.secret(), StellarAccounts.lamboTokenAsset(), '10000')
            .then((result) => {
              this.debugLog(result)

              this.su.sendAsset(this.distributorAcct.secret, keypair.publicKey(), '12', StellarAccounts.lamboTokenAsset())
                .then((response) => {
                  StellarAccounts.addAccount(keypair, {}, null, 'token')

                  this.debugLog(response, 'Success')
                  this.su.updateBalances()
                })
                .catch((error) => {
                  this.debugLog(error, 'Error')
                })
            })
            .catch((error) => {
              this.debugLog(error)
            })
        })
        .catch((error) => {
          this.debugLog(error)
        })
    },
    buyLamboTokens() {
      this.debugLog('Buying tokens..')

      this.su.buyTokens(this.tokenBuyerAcct.secret, this.su.lumins(), StellarAccounts.lamboTokenAsset(), '1000', '2.22')
        .then((response) => {
          this.debugLog(response)

          this.su.updateBalances()
        })
        .catch((error) => {
          this.debugLog(error)
        })
    },
    buyerInfo() {
      this.su.accountInfo(this.tokenBuyerAcct.publicKey)
        .then((result) => {
          this.debugLog(result)
        })
        .catch((err) => {
          this.debugLog(err, 'ERROR')
        })
    },
    paymentPaths() {
      this.debugLog('Source: ' + this.tokenBuyerAcct.publicKey + '<br>Destination: ' + this.tokenBuyerAcct.publicKey + '<br>Issuer: ' + this.issuerAcct.publicKey + '<br>Distributor: ' + this.distributorAcct.publicKey)
      this.su.server().paths(this.tokenBuyerAcct.publicKey, this.tokenBuyerAcct.publicKey, StellarAccounts.lamboTokenAsset(), '3')
        .call()
        .then((response) => {
          this.debugLog(response)
        })
    },
    manageOffer() {
      this.debugLog('Managing Offer...')

      const price = {
        n: 225,
        d: 1
      }

      this.su.manageOffer(this.distributorAcct.secret, this.su.lumins(), StellarAccounts.lamboTokenAsset(), '5000', price)
        .then((result) => {
          this.debugLog(result, 'Success')
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
        })
    },
    manageOfferETH() {
      this.debugLog('Managing offer Ethereum...')

      const price = {
        n: 1,
        d: 10
      }

      this.su.manageOffer(this.distributorAcct.secret, StellarAccounts.ethereumAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
        .then((result) => {
          this.debugLog(result, 'Success')
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
        })
    },
    manageOfferBTC() {
      this.debugLog('Managing offer Bitcoin...')

      const price = {
        n: 1,
        d: 10
      }

      this.su.manageOffer(this.distributorAcct.secret, StellarAccounts.bitcoinAsset(), StellarAccounts.lamboTokenAsset(), '5000', price)
        .then((result) => {
          this.debugLog(result, 'Success')
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
        })
    },
    lockIssuer() {
      this.debugLog('Locking issuer...')

      this.su.lockAccount(this.issuerAcct.secret)
        .then((result) => {
          this.debugLog('locked!')
          this.debugLog(result)
        })
        .catch((error) => {
          this.debugLog(error)
        })
    },
    createTokens() {
      this.debugLog('Creating tokens...')

      this.su.sendAsset(this.issuerAcct.secret, this.distributorAcct.publicKey, '10000', StellarAccounts.lamboTokenAsset(), 'Created Tokens')
        .then((response) => {
          this.debugLog(response, 'Success')

          this.su.updateBalances()
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
        })
    },
    setDistributorTrust(asset) {
      this.debugLog('Setting distributor trust...')

      this.su.changeTrust(this.distributorAcct.secret, asset, '10000')
        .then((result) => {
          this.debugLog(result)
        })
        .catch((error) => {
          this.debugLog(error)
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
      this.debugLog('Setting buyer trust...')

      // buyer must trust the distributor
      this.su.changeTrust(this.tokenBuyerAcct.secret, StellarAccounts.lamboTokenAsset(), '10000')
        .then((result) => {
          this.debugLog(result)
        })
        .catch((error) => {
          this.debugLog(error)
        })
    },
    showOffers() {
      this.debugLog('Offers...')

      this.su.server().offers('accounts', this.distributorAcct.publicKey)
        .call()
        .then((response) => {
          response.records.forEach((offer) => {
            this.debugLog(offer)
          })
        })
    },
    deleteOffersFromArray(offers) {
      const offer = offers.pop()
      if (offer) {
        const buying = this.su.assetFromObject(offer.buying)
        const selling = this.su.assetFromObject(offer.selling)

        this.su.manageOffer(this.distributorAcct.secret, buying, selling, '0', offer.price_r, offer.id)
          .then((result) => {
            this.debugLog(result, 'Success')

            this.deleteOffersFromArray(offers)
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      }
    },
    deleteOffers() {
      this.debugLog('Deleting Offers...')

      this.su.server().offers('accounts', this.distributorAcct.publicKey)
        .call()
        .then((response) => {
          // this.debugLog(response)
          this.deleteOffersFromArray(response.records)
          return true
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
          return false
        })
    },
    createAccounts() {
      this.debugLog('Creating Accounts...')

      this.issuerAcct = StellarAccounts.accountWithName('Issuer')
      if (!this.issuerAcct) {
        this.su.createTestAccount('Issuer', 'token')
          .then((result) => {
            this.issuerAcct = result
          })
          .catch((error) => {
            this.debugLog(error)
          })
      }

      this.distributorAcct = StellarAccounts.accountWithName('Distributor')
      if (!this.distributorAcct) {
        this.su.createTestAccount('Distributor', 'token')
          .then((result) => {
            this.distributorAcct = result
          })
          .catch((error) => {
            this.debugLog(error)
          })
      }

      this.tokenBuyerAcct = StellarAccounts.accountWithName('Token buyer')
      if (!this.tokenBuyerAcct) {
        this.su.createTestAccount('Token buyer', 'token')
          .then((result) => {
            this.tokenBuyerAcct = result
          })
          .catch((error) => {
            this.debugLog(error)
          })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.info-area {
    width: 100%;
    padding: 20px;
    background: steelblue;
    color: white;

    h3 {
        text-align: center;
    }
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
