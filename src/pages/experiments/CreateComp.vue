<template>
  <div class="comp-box">
    <div class="user-buttons">
      <v-btn
        round
        small
        color="primary"
        @click="createAccount"
        :loading="loadingCreate"
      >Create Account</v-btn>
      <v-btn
        round
        small
        color="primary"
        @click="buyAssetDialogPing = !buyAssetDialogPing"
        :loading="loadingBuy"
      >Buy</v-btn>
      <v-btn
        round
        small
        color="primary"
        @click="sendAssetsDialogPing = !sendAssetsDialogPing"
        :loading="loadingSend"
      >Send</v-btn>
    </div>

    <div class="admin-area">
      <div>Admin</div>
      <dialog-accounts
        ref="dialogAccounts"
        v-on:enter-key-down="adminEnterKey"
        :model="model"
        :showSource="true"
        :showFunding="true"
        :showAsset="true"
      />
    </div>

    <SendAssetsDialog :ping="sendAssetsDialogPing" :model="model"/>
    <BuyAssetDialog :ping="buyAssetDialogPing" :model="model"/>
  </div>
</template>

<script>
import SendAssetsDialog from '../../components/dialogs/SendAssetsDialog.vue'
import BuyAssetDialog from '../../components/dialogs/BuyAssetDialog.vue'
import ReusableStellarViewsModel from '../../components/ReusableStellarViewsModel.js'
import ReusableStellarViews from '../../components/ReusableStellarViews.vue'
import StellarUtils from '../../js/StellarUtils.js'
import { StellarWallet } from 'stellarkit-js-utils'
import Helper from '../../js/helper.js'
import StellarAccounts from '../../js/StellarAccounts.js'

export default {
  props: ['asset'],
  components: {
    BuyAssetDialog,
    SendAssetsDialog,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      model: new ReusableStellarViewsModel(),
      loadingSend: false,
      loadingBuy: false,
      loadingCreate: false,
      sendAssetsDialogPing: false,
      buyAssetDialogPing: false
    }
  },
  methods: {
    adminEnterKey() {
      //  sdf
    },
    displayToast(message, error = false) {
      Helper.toast(message, error)
    },
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    createAccount() {
      const signerWallet = this.dialogAccounts().sourceWallet()
      const asset = this.dialogAccounts().asset()
      let fundingWallet = this.dialogAccounts().fundingWallet()
      let userWallet = null
      const startingBalance = 3

      if (!fundingWallet) {
        fundingWallet = signerWallet
      }

      if (signerWallet && asset) {
        this.loading = true

        const acct = StellarAccounts.accountWithPublicKey(asset.getIssuer())
        const issuerWallet = StellarWallet.secret(acct.secret)

        if (!issuerWallet) {
          throw new Error('issuer account not found for asset')
        }

        Helper.debugLog('creating users wallet...')
        StellarUtils.newAccount(fundingWallet, String(startingBalance))
          .then(accountInfo => {
            userWallet = StellarWallet.secret(accountInfo.keypair.secret())

            if (!userWallet) {
              throw new Error('userWallet null')
            }

            Helper.debugLog('setting trust for token...')
            const trustLimit = 1000000
            return StellarUtils.changeTrust(
              userWallet,
              fundingWallet,
              asset,
              String(trustLimit)
            )
          })
          .then(result => {
            Helper.debugLog('allowing user to hold tokens...')
            return StellarUtils.allowTrust(
              issuerWallet,
              userWallet,
              asset,
              true
            )
              .then(() => {
                return null
              })
              .catch(() => {
                Helper.debugLog('Allow trust not necessary, continuing...')
                return null
              })
          })
          .then(result => {
            Helper.debugLog('adding multi sig to users wallet...')
            return StellarUtils.makeMultiSig(
              userWallet,
              signerWallet,
              fundingWallet
            )
          })
          .then(result => {
            this.displayToast('Success! Users wallet is ready.')
            return null
          })
          .catch(error => {
            Helper.debugLog(error)
            this.displayToast('Error', true)
          })
          .finally(() => {
            this.loading = false
            StellarUtils.updateBalances()
          })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.comp-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .admin-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    padding: 10px;
    margin: 10px;
  }
}
</style>
