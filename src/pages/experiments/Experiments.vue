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

      <div class="section-box">
        <div class="section-title">Set Trust</div>
        <TrustComp :asset="trustAsset"/>
      </div>

      <div class="section-box">
        <div class="section-title">Request Tokens</div>
        <RequestComp :asset="trustAsset"/>
      </div>

      <div class="section-box">
        <div class="section-title">Redeem Tokens</div>

        <RedeemComp :asset="trustAsset" :destKey="burn"/>
      </div>

      <div class="section-box">
        <div class="section-title">Redeem Transactions</div>

        <RedeemTransactions :asset="trustAsset" :publicKey="burn"/>
      </div>

      <!-- <div class="section-box">
        <div class="section-title">Create Account</div>

        <CreateComp :asset="trustAsset"/>
      </div>-->
    </div>
  </div>
</template>

<script>
import Helper from '../../js/helper.js'
import StellarCommonMixin from '../../components/StellarCommonMixin.js'
import InstructionsHeader from '../../components/InstructionsHeader.vue'
import AccountList from '../../components/AccountList.vue'
const StellarSdk = require('stellar-sdk')
import SettingsStore from '../../js/SettingsStore.js'
import TrustComp from './TrustComp.vue'
import RequestComp from './RequestComp.vue'
import RedeemComp from './RedeemComp.vue'
import CreateComp from './CreateComp.vue'
import RedeemTransactions from './RedeemTransactions.vue'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      loading: false,
      email: '',
      tokenProjects: [],
      publicKey: '',
      showSummary: false,
      trustAsset: null,
      burn: ''
    }
  },
  components: {
    TrustComp,
    RequestComp,
    RedeemComp,
    CreateComp,
    RedeemTransactions,
    'account-list': AccountList,
    'instructions-header': InstructionsHeader
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
    updateProjectIndex(index) {
      this.projectIndex = index

      const project = this.currentProject()
      if (project) {
        this.showSummary = true
        this.trustAsset = new StellarSdk.Asset(project.symbol, project.issuer)

        // content: project.symbol
        // content: project.issuer
        // content: project.issuerSecret,
        // content: project.distributor
        // content: project.distributorSecret,

        this.burn = project.burn
      } else {
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
    adminEnterKey() {
      Helper.debugLog('nothing')
    },
    requestTokens() {
      // fdff
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 60vh;

  .section-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.96);
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px 0;

    // HACK, added for datatable.  It was not stretching to fit over a table.  mystery
    flex: 1 0 auto;

    .section-title {
      font-weight: bold;
      color: rgba(0, 40, 90, 0.7);
      font-size: 1.71em;
      margin-bottom: 20px;
    }

    .user-buttons {
      margin-top: 10px;
      button {
        margin: 0 3px;
      }
    }
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
  }
}
</style>
