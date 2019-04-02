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
        <div class="summary-list">
          <div class="operations-item" v-for="item in summaryMap" :key="item.content">
            <div class="item-name">{{item.title}}:</div>
            <div v-if="item.secret" class="item-value" @click="item.secret = false">Click to reveal</div>
            <div v-else class="item-value">{{item.content}}</div>
          </div>
        </div>
      </div>

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

        <RedeemComp :asset="trustAsset"/>
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

import SettingsStore from '../../js/SettingsStore.js'
import TrustComp from './TrustComp.vue'
import RequestComp from './RequestComp.vue'
import RedeemComp from './RedeemComp.vue'
import CreateComp from './CreateComp.vue'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      loading: false,
      email: '',
      tokenProjects: [],
      summaryMap: [],
      publicKey: '',
      showSummary: false,
      trustAsset: null
    }
  },
  components: {
    TrustComp,
    RequestComp,
    RedeemComp,
    CreateComp,
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
  max-height: 900px;

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
