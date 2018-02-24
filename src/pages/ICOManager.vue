<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <div class='page-title'>
    ICO Manager
    <div class='page-subtitle'>
      Under Construction
    </div>
  </div>
  <div class='page-contents'>

    <v-menu offset-y :transition=false>
      <v-btn :ripple=false slot="activator">
        {{menuButtonName}}
        <v-icon>&#xE5C5;</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile v-for="(item, index) in tokenMenuItems" :key="item.title" @click="projectsMenuClick(index, item.action)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <div class='summary-view'>
      <div class='summary-header'>Token Information
        <v-spacer />
        <v-btn small icon @click='deleteTokenProject'>
          <v-icon>close</v-icon>
        </v-btn>
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

      <div class='button-holder'>
        <v-btn round @click="manageOffer()">Manage Offer</v-btn>
        <v-btn round @click="showOffers()">Show Offers</v-btn>
        <v-btn round @click="deleteOffers()">Delete Offers</v-btn>
        <v-btn round @click="lockIssuer()">Lock Issuer</v-btn>
        <v-btn round @click="createUserAccount()">Create Account</v-btn>
      </div>
    </div>
  </div>

  <manage-offer-dialog :ping='offerDialogPing' :project='dialogProject' />
  <create-account-dialog :ping='accountDialogPing' :project='dialogProject' />
  <create-token-dialog v-on:token-created='createDialogResult' :ping='createDialogPing ' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import Helper from '../js/helper.js'
import AccountList from '../components/AccountList.vue'
import CreateTokenDialog from '../components/dialogs/CreateTokenDialog.vue'
import CreateAccountDialog from '../components/dialogs/CreateAccountDialog.vue'
import ManageOfferDialog from '../components/dialogs/ManageOfferDialog.vue'
import StyleExtractionMixin from '../components/StyleExtractionMixin.js'
const $ = require('jquery')
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin, StyleExtractionMixin],
  components: {
    'account-list': AccountList,
    'create-token-dialog': CreateTokenDialog,
    'manage-offer-dialog': ManageOfferDialog,
    'create-account-dialog': CreateAccountDialog
  },
  computed: {
    menuButtonName: function () {
      const project = this.currentProject()
      if (project) {
        return 'Token: ' + project.symbol
      }

      return 'Create Token'
    },
    tokenMenuItems: function () {
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
      dialogProject: null,
      accountDialogPing: false
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
    deleteTokenProject() {
      this.tokenProjects.splice(this.projectIndex, 1)
      this.saveProjects()
    },
    updateProjectIndex(index) {
      this.projectIndex = index

      this.summaryMap = new Map()

      const project = this.currentProject()
      if (project) {
        this.setAccountsTag(project.symbol)

        this.summaryMap.set('Symbol', project.symbol)
        this.summaryMap.set('Amount', project.tokenAmount)

        this.summaryMap.set('Issuer', project.issuer)
        this.summaryMap.set('Issuer Secret', project.issuerSecret)
        this.summaryMap.set('Distributor', project.distributor)
        this.summaryMap.set('Distributor Secret', project.distributorSecret)
      } else {
        this.setAccountsTag(null)
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
      this.printTokenInfo($('.summary-view'))
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
        StellarUtils.server().offers('accounts', this.project.distributor)
          .call()
          .then((response) => {
            // Helper.debugLog(response)
            return this.deleteOffersFromArray(project, response.records)
          })
          .then((result) => {
            Helper.debugLog('Deleted all offers', 'Success')
            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            return false
          })
      }
    },
    lockIssuer() {
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
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

    .page-contents {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        min-height: 400px;
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

        .button-holder {
            margin-top: 10px;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
