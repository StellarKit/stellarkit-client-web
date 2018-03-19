<template>
<div>
  <account-list :items="accountsUI" />
  <instructions-header>
    <div>Content coming soon....</div>
  </instructions-header>

  <div class='page-contents'>
    <v-menu offset-y :transition=false>
      <v-btn small color='primary' :ripple=false slot="activator">
        {{menuButtonName}}
        <v-icon>&#xE5C5;</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile v-for="(item, index) in tokenMenuItems" :key="item.title" @click="projectsMenuClick(index, item.action)">
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <div v-if='showSummary' class='summary-view'>
      <div class='summary-header'>Token Information
        <v-spacer />
        <v-btn small icon @click='deleteTokenProject'>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn small icon @click='printInfo'>
          <v-icon>&#xE8AD;</v-icon>
        </v-btn>
      </div>
      <div class='summary-list'>
        <div class='operations-item' v-for="item in summaryMap" :key=item.content>
          <div class='item-name'>
            {{item.title}}:
          </div>
          <div v-if='item.secret && !printing' class='item-value' @click='item.secret = false'>
            Click to reveal
          </div>
          <div v-else class='item-value'>
            {{item.content}}
          </div>
        </div>
      </div>
      <div class='button-group'>
        <v-btn round small @click="createUserAccount()">Create Account</v-btn>
        <v-btn round small @click="sendTokens()">Send Tokens</v-btn>
        <v-btn round small @click="manageOffer()">Manage Offer</v-btn>
        <v-btn round small @click="showOffers()">Show Offers</v-btn>
        <v-btn round small @click="deleteOffers()">Delete Offers</v-btn>
        <v-btn round small @click="lockIssuer()">Lock Issuer</v-btn>
      </div>
    </div>
  </div>

  <manage-offer-dialog :ping='offerDialogPing' :project='dialogProject' />
  <send-tokens-dialog :ping='sendTokensDialogPing' :project='dialogProject' />
  <create-account-dialog :ping='accountDialogPing' :project='dialogProject' />
  <create-token-dialog v-on:token-created='createDialogResult' :ping='createDialogPing' />
  <confirm-dialog v-on:confirm-dialog-ok='deleteTokenProjectConfirmed' :ping='confirmDialogPing' title='Delete Token Project?' message='Do you want to delete this token project? Tokens will remain on the network, but make sure you have your keys.' okTitle='Delete Project'
  />
  <confirm-dialog v-on:confirm-dialog-ok='lockIssuerConfirmed' :ping='confirmLockDialogPing' title='Lock Issuer?' message='Any tokens or currency on this account will be locked forever. This feature is great to ensure no more tokens can ever be created. But make sure everything on this account is set, for example the home domain.'
    okTitle='Lock Issuer' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import Helper from '../js/helper.js'
import AccountList from '../components/AccountList.vue'
import CreateTokenDialog from '../components/dialogs/CreateTokenDialog.vue'
import CreateAccountDialog from '../components/dialogs/CreateAccountDialog.vue'
import ManageOfferDialog from '../components/dialogs/ManageOfferDialog.vue'
import SendTokensDialog from '../components/dialogs/SendTokensDialog.vue'
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue'
import StyleExtractionMixin from '../components/StyleExtractionMixin.js'
const $ = require('jquery')
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'
import InstructionsHeader from '../components/InstructionsHeader.vue'

export default {
  mixins: [StellarCommonMixin, StyleExtractionMixin],
  components: {
    'account-list': AccountList,
    'create-token-dialog': CreateTokenDialog,
    'manage-offer-dialog': ManageOfferDialog,
    'create-account-dialog': CreateAccountDialog,
    'send-tokens-dialog': SendTokensDialog,
    'instructions-header': InstructionsHeader,
    'confirm-dialog': ConfirmDialog
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

      result.push({
        title: 'Create Token...',
        action: 'create'
      })

      return result
    }
  },
  data() {
    return {
      tokenProjects: [],
      summaryMap: [],
      projectIndex: 0,
      createDialogPing: false,
      offerDialogPing: false,
      sendTokensDialogPing: false,
      dialogProject: null,
      accountDialogPing: false,
      showSummary: false,
      confirmDialogPing: false,
      confirmLockDialogPing: false,
      printing: false
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
    lockIssuerConfirmed() {
      Helper.debugLog('Locking issuer...')
      const project = this.currentProject()
      if (project) {
        StellarUtils.lockAccount(StellarWallet.secret(project.issuerSecret))
          .then((result) => {
            Helper.debugLog('locked!')
            Helper.debugLog(result)

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
    },
    deleteTokenProjectConfirmed() {
      this.tokenProjects.splice(this.projectIndex, 1)
      this.saveProjects()

      this.updateProjectIndex(0)
    },
    deleteTokenProject() {
      this.confirmDialogPing = !this.confirmDialogPing
    },
    updateProjectIndex(index) {
      this.projectIndex = index

      this.summaryMap = []

      const project = this.currentProject()
      if (project) {
        this.setAccountsTag(project.symbol)
        this.showSummary = true

        this.summaryMap.push({
          'title': 'Symbol',
          'content': project.symbol
        }, {
          'title': 'Issuer',
          'content': project.issuer
        }, {
          'title': 'Issuer Secret',
          'content': project.issuerSecret,
          'secret': true
        }, {
          'title': 'Distributor',
          'content': project.distributor
        }, {
          'title': 'Distributor Secret',
          'content': project.distributorSecret,
          'secret': true
        })
      } else {
        this.setAccountsTag(null)
        this.showSummary = false
      }
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
    printInfo() {
      this.printing = true

      this.$nextTick(() => {
        this.printTokenInfo($('.summary-list'))
        this.printing = false
      })
    },
    createToken() {
      Helper.debugLog('creating token')
      this.createDialogPing = !this.createDialogPing
    },
    createDialogResult(issuerKeypair, distributorKeypair, asset) {
      this.tokenProjects.push({
        symbol: asset.getCode(),
        issuer: issuerKeypair.publicKey(),
        issuerSecret: issuerKeypair.secret(),
        distributor: distributorKeypair.publicKey(),
        distributorSecret: distributorKeypair.secret()
      })

      this.updateProjectIndex(this.tokenProjects.length - 1)
      this.saveProjects()
    },
    saveProjects() {
      Helper.set('token-projects', this.tokenProjects)
    },
    loadProjects() {
      return Helper.get('token-projects')
    },
    displayToken(index) {
      this.updateProjectIndex(index)
    },
    manageOffer() {
      this.dialogProject = this.currentProject()
      this.offerDialogPing = !this.offerDialogPing
    },
    sendTokens() {
      this.dialogProject = this.currentProject()
      this.sendTokensDialogPing = !this.sendTokensDialogPing
    },
    createUserAccount() {
      this.dialogProject = this.currentProject()
      this.accountDialogPing = !this.accountDialogPing
    },
    showOffers() {
      Helper.debugLog('Offers...')

      const project = this.currentProject()
      if (project) {
        StellarUtils.server().offers('accounts', project.distributor)
          .call()
          .then((response) => {
            response.records.forEach((offer) => {
              Helper.debugLog(offer)
            })

            Helper.debugLog('Offers done')

            return null
          })
      }
    },
    deleteOffersFromArray(project, offers) {
      return new Promise((resolve, reject) => {
        const offer = offers.pop()
        if (offer) {
          const buying = StellarUtils.assetFromObject(offer.buying)
          const selling = StellarUtils.assetFromObject(offer.selling)

          StellarUtils.manageOffer(StellarWallet.secret(project.distributorSecret), null, buying, selling, '0', offer.price_r, offer.id)
            .then((result) => {
              Helper.debugLog(result, 'Success')

              resolve(this.deleteOffersFromArray(project, offers))
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
      const project = this.currentProject()
      if (project) {
        StellarUtils.server().offers('accounts', project.distributor)
          .call()
          .then((response) => {
            // Helper.debugLog(response)
            return this.deleteOffersFromArray(project, response.records)
          })
          .then((result) => {
            Helper.debugLog('Deleted all offers', 'Success')
            StellarUtils.updateBalances()

            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            return false
          })
      }
    },
    lockIssuer() {
      this.confirmLockDialogPing = !this.confirmLockDialogPing
    },
    projectsMenuClick(index, action) {
      switch (action) {
        case 'create':
          this.createToken()
          break
        default:
          this.displayToken(index)
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/styles.scss';

.page-title {
    position: relative;
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;

    .page-subtitle {
        font-size: 0.9em;
        font-weight: normal;
    }
}

.page-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
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
</style>
