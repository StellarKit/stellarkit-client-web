<template>
  <div>
    <account-list :items="accountsUI"/>

    <instructions-header>
      <div>Content coming soon...</div>
    </instructions-header>

    <div class="main-container">
      <v-menu offset-y :transition="false">
        <v-btn small color="primary" slot="activator">
          {{menuButtonName}}
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile
            v-for="(item, index) in tokenMenuItems"
            :key="item.title"
            @click="projectsMenuClick(index, item.action)"
          >
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <div v-if="showSummary" class="summary-view">
        <div class="summary-header">
          Token Information
          <v-spacer/>
          <v-btn small icon @click="printInfo">
            <v-icon>&#xE8AD;</v-icon>
          </v-btn>
        </div>
        <div class="summary-list">
          <div class="operations-item" v-for="item in summaryMap" :key="item.content">
            <div class="item-name">{{item.title}}:</div>
            <div
              v-if="item.secret && !printing"
              class="item-value"
              @click="item.secret = false"
            >Click to reveal</div>
            <div v-else class="item-value">{{item.content}}</div>
          </div>
        </div>
      </div>

      <div class="section-box">
        <div class="section-title">Set Trust</div>

        <div>You must trust the Carbon asset before you can request your tokens. This can be done in your Stellar wallet application, or you can do it here.</div>

        <v-text-field
          style="width: 100%;"
          label="Secret Key"
          placeholder="Example: SCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
          v-model.trim="publicKey"
          @keyup.enter="requestTokens()"
        ></v-text-field>

        <v-btn
          round
          small
          color="primary"
          @click="sendAssetsDialogPing = !sendAssetsDialogPing"
          :loading="loadingSend"
        >Trust Asset</v-btn>
      </div>

      <div class="section-box">
        <div class="section-title">Request Tokens</div>

        <div>Enter your email address and public key to your Stellar wallet. We will send the tokens to the wallet. Your wallet must trust our asset, or this will fail.</div>

        <v-text-field
          style="width: 100%;"
          label="Email"
          placeholder="email@example.com"
          v-model.trim="email"
          @keyup.enter="requestTokens()"
        ></v-text-field>
        <v-text-field
          style="width: 100%;"
          label="Public Key"
          placeholder="Example: GCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
          v-model.trim="publicKey"
          @keyup.enter="requestTokens()"
        ></v-text-field>

        <v-btn
          round
          small
          color="primary"
          @click="sendAssetsDialogPing = !sendAssetsDialogPing"
          :loading="loadingSend"
        >Request Tokens</v-btn>
      </div>

      <div class="section-box">
        <div class="section-title">Redeem Tokens</div>

        <div>Send tokens to the Burn Carbon account to make them inaccessible forever.</div>

        <v-text-field
          style="width: 100%;"
          label="Secret Key"
          placeholder="Example: SCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
          v-model.trim="publicKey"
          @keyup.enter="requestTokens()"
        ></v-text-field>

        <v-btn
          round
          small
          color="primary"
          @click="sendAssetsDialogPing = !sendAssetsDialogPing"
          :loading="loadingSend"
        >Trust Asset</v-btn>
      </div>

      <div class="section-box">
        <div>Sign up for a free account</div>
        <div class="user-buttons">
          <v-btn
            round
            small
            color="primary"
            @click="createAccount"
            :loading="loading"
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
    </div>

    <send-assets-dialog :ping="sendAssetsDialogPing" :model="model"/>
    <buy-asset-dialog :ping="buyAssetDialogPing" :model="model"/>
  </div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import AccountList from '../components/AccountList.vue'
import ReusableStellarViews from '../components/ReusableStellarViews.vue'
import StellarUtils from '../js/StellarUtils.js'
import StellarAccounts from '../js/StellarAccounts.js'
import { StellarWallet } from 'stellarkit-js-utils'
import SendAssetsDialog from '../components/dialogs/SendAssetsDialog.vue'
import BuyAssetDialog from '../components/dialogs/BuyAssetDialog.vue'
import ReusableStellarViewsModel from '../components/ReusableStellarViewsModel.js'
import SettingsStore from '../js/SettingsStore.js'
import $ from 'jquery'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      model: new ReusableStellarViewsModel(),
      loading: false,
      loadingBuy: false,
      loadingSend: false,
      buyAssetDialogPing: false,
      sendAssetsDialogPing: false,
      email: '',
      tokenProjects: [],
      summaryMap: [],
      publicKey: '',
      showSummary: false,
      printing: false
    }
  },
  components: {
    'account-list': AccountList,
    'instructions-header': InstructionsHeader,
    'dialog-accounts': ReusableStellarViews,
    'buy-asset-dialog': BuyAssetDialog,
    'send-assets-dialog': SendAssetsDialog
  },
  computed: {
    menuButtonName: function() {
      const project = this.currentProject()
      if (project) {
        return 'Token: ' + project.symbol
      }

      return 'Create Token'
    },
    tokenMenuItems: function() {
      const result = []

      for (const item of this.tokenProjects) {
        result.push({
          title: 'Token: ' + item.symbol,
          symbol: item.symbol
        })
      }

      return result
    }
  },
  mounted() {
    this.tokenProjects = this.loadProjects()
    if (!this.tokenProjects) {
      this.tokenProjects = []
    }
    this.updateProjectIndex(0)
  },
  methods: {
    displayToken(index) {
      this.updateProjectIndex(index)
    },
    projectsMenuClick(index, action) {
      switch (action) {
        case 'create':
          break
        default:
          this.displayToken(index)
          break
      }
    },
    printInfo() {
      this.printing = true

      this.$nextTick(() => {
        this.printTokenInfo($('.summary-list'))
        this.printing = false
      })
    },
    updateProjectIndex(index) {
      this.projectIndex = index

      this.summaryMap = []

      const project = this.currentProject()
      if (project) {
        this.setAccountsTag(project.symbol)
        this.showSummary = true

        this.summaryMap.push(
          {
            title: 'Symbol',
            content: project.symbol
          },
          {
            title: 'Issuer',
            content: project.issuer
          },
          {
            title: 'Issuer Secret',
            content: project.issuerSecret,
            secret: true
          },
          {
            title: 'Distributor',
            content: project.distributor
          },
          {
            title: 'Distributor Secret',
            content: project.distributorSecret,
            secret: true
          },
          {
            title: 'Burn',
            content: project.burn
          }
        )
      } else {
        this.setAccountsTag(null)
        this.showSummary = false
      }
    },
    loadProjects() {
      return SettingsStore.get('token-projects')
    },
    currentProject() {
      if (this.tokenProjects.length > 0) {
        if (this.projectIndex >= this.tokenProjects.length) {
          this.updateProjectIndex(0)
        }

        return this.tokenProjects[this.projectIndex]
      }

      return null
    },
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    adminEnterKey() {
      Helper.debugLog('nothing')
    },
    requestTokens() {
      // fdff
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
    },
    displayToast(message, error = false) {
      Helper.toast(message, error)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../scss/styles.scss';

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-box {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.025);
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    margin: 20px 0;

    .section-title {
      font-weight: bold;
      font-size: 1.1em;
    }

    .user-buttons {
      margin-top: 10px;
      button {
        margin: 0 3px;
      }
    }
  }
  .admin-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    padding: 10px;
    margin: 10px;
  }

  .summary-view {
    margin: 10px;
    width: 90%;
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

      button {
        margin: 0;
      }
    }

    .operations-item {
      display: flex;
      font-size: 0.95em;

      .item-name {
        text-align: right;
        padding-right: 5px;
        font-weight: bold;
        flex: 1 1 20%;
      }

      .item-value {
        text-align: left;
        flex: 2 2 80%;
        padding-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: monospace;
        width: 0;
      }
    }
  }
}
</style>
