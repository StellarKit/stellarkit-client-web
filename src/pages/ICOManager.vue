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
      </summary-view>
    </div>
  </div>

  <create-token-dialog v-on:token-created='createDialogResult' :ping='createDialogPing' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import Helper from '../js/helper.js'
import AccountList from '../components/AccountList.vue'
import CreateTokenDialog from '../components/CreateTokenDialog.vue'
import StyleExtractionMixin from '../components/StyleExtractionMixin.js'
const $ = require('jquery')

export default {
  mixins: [StellarCommonMixin, StyleExtractionMixin],
  components: {
    'account-list': AccountList,
    'create-token-dialog': CreateTokenDialog
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
      createDialogPing: false
    }
  },
  mounted() {
    this.tokenProjects = Helper.get('token-projects')
    if (!this.tokenProjects) {
      this.tokenProjects = []
    }
    this.updateProjectIndex(0)
  },
  methods: {
    deleteTokenProject() {
      this.tokenProjects.splice(this.projectIndex, 1)
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
      Helper.set('token-projects', this.tokenProjects)
    },
    displayToken(index) {
      this.updateProjectIndex(index)
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
    }
}
</style>
