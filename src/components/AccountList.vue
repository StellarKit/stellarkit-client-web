<template>
<div class='main-container'>
  <div class='add-button'>
    <v-menu
      v-if='isTestnet()'
      offset-y
      :transition=false
    >
      <v-btn
        icon
        dark
        slot="activator"
      >
        <v-tooltip
          open-delay='800'
          bottom
        >
          <v-icon slot='activator'>&#xE147;</v-icon>
          <span>Create new account</span>
        </v-tooltip>
      </v-btn>

      <v-list dense>
        <v-list-tile @click="accountMenu('test')">
          <v-list-tile-title>Create New Testnet Account</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="accountMenu('other')">
          <v-list-tile-title>More Options...</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn
      v-else
      icon
      dark
      @click="accountMenu('other')"
    >
      <v-tooltip
        open-delay='800'
        bottom
      >
        <v-icon slot='activator'>&#xE147;</v-icon>
        <span>Create new account</span>
      </v-tooltip>
    </v-btn>
  </div>

  <v-btn
    class='refresh-button'
    icon
    dark
    @click="refresh()"
  >
    <v-tooltip
      open-delay='800'
      bottom
    >
      <v-icon slot='activator'>&#xE5D5;</v-icon>
      <span>Refresh account balances</span>
    </v-tooltip>
  </v-btn>

  <div class='accounts-title'>Accounts - Click for Info</div>
  <div
    v-if='items.length === 0'
    class='zero-accounts'
  >
    Create an account
  </div>
  <transition-group
    v-else
    class='accounts'
    name="list"
    tag="div"
  >
    <div
      class='account-item'
      v-for="item in items"
      @click.stop='clickItem(item)'
      :key='item.publicKey'
    >
      <v-tooltip
        open-delay='200'
        bottom
      >
        <div slot="activator">
          <div class='account-name'>{{item.name}}</div>
          <div
            v-for="balance in balancesForItem(item)"
            :key='balance.issuer + balance.symbol'
          >
            {{balance.symbol}}: {{balance.amount}}
          </div>
        </div>
        <span>{{item.publicKey}}</span>
      </v-tooltip>
      <div class='action-button-holder'>
        <actions-menu
          :small=true
          :publicKey='item.publicKey'
        />
      </div>
      <v-btn
        class='delete-button'
        icon
        small
        @click.stop='deleteItem(item)'
      >
        <v-tooltip
          open-delay='200'
          bottom
        >
          <v-icon slot="activator">&#xE15C;</v-icon>
          <span>Remove account</span>
        </v-tooltip>
      </v-btn>
    </div>
  </transition-group>

  <new-account-dialog
    :model='model'
    :ping='newAccountDialogPing'
  />

  <confirm-dialog
    v-on:confirm-dialog-ok='removeAccountConfirmed'
    :ping='confirmRemoveDialogPing'
    title='Remove Account?'
    message='Make sure you saved the secret key! You can later add this account back using the secret key.'
    okTitle='Remove Account'
  />
</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import NewAccountDialog from './dialogs/NewAccountDialog.vue'
import {
  TimelineMax,
  Power3
} from 'gsap'
import $ from 'jquery'
import StellarAccounts from '../js/StellarAccounts.js'
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue'
import AssetManager from '../js/AssetManager.js'
import ActionsMenu from './ActionsMenu.vue'
import ReusableStellarViewsModel from '../components/ReusableStellarViewsModel.js'

export default {
  props: ['items'],
  data() {
    return {
      model: new ReusableStellarViewsModel(),
      timeline: null,
      newAccountDialogPing: false,
      confirmRemoveDialogPing: false,
      itemToRemove: null
    }
  },
  components: {
    NewAccountDialog,
    ConfirmDialog,
    ActionsMenu
  },
  mounted() {
    setInterval(() => {
      if (this.items.length === 0) {
        this.animateCreateButton()
      } else {
        if (this.timeline) {
          this.timeline.kill()
          this.timeline = null
        }
      }
    }, 2000)
  },
  methods: {
    isTestnet() {
      return StellarUtils.isTestnet()
    },
    balancesForItem(item) {
      // don 't want so many balances that the view gets huge vertically
      const max = 5

      const sortFunct = (a, b) => {
        let result = 0

        if (a.symbol === b.symbol) {
          result = 0
        } else if (a.symbol.toUpperCase() === 'XLM') {
          result = -1
        } else if (b.symbol.toUpperCase() === 'XLM') {
          result = 1
        } else if (a.symbol < b.symbol) {
          result = -1
        } else if (a.symbol > b.symbol) {
          result = 1
        }

        if (a.amount === '0' && b.amount !== '0') {
          result = 1
        } else if (b.amount === '0' && a.amount !== '0') {
          result = -1
        }

        return result
      }

      if (item.assetBalances) {
        const balanceCopy = item.assetBalances.slice()

        balanceCopy.sort(sortFunct)

        return balanceCopy.slice(0, max)
      }

      return []
    },
    animateCreateButton() {
      if (!this.timeline) {
        // other tabs have this same view, so only find the one in ours
        const el = $(this.$el).find('.add-button i')

        this.timeline = new TimelineMax({
            repeat: -1,
            yoyo: false,
            repeatDelay: 1
          })
          .to(el, 0.2, {
            ease: Power3.easeIn,
            scale: 1.5
          })
          .to(el, 0.4, {
            ease: Power3.easeOut,
            scale: 1
          })
      }
    },
    accountMenu(id) {
      switch (id) {
        case 'test':
          StellarUtils.createTestAccount()
            .then((result) => {
              Helper.debugLog(result)
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
            })
          break
        case 'other':
          this.model = new ReusableStellarViewsModel()
          this.model.fundingMessage = 'Choose an account to pay the transaction fee'

          this.newAccountDialogPing = !this.newAccountDialogPing
          break
        default:
          break
      }
    },
    clickItem(item) {
      StellarUtils.accountInfo(item.publicKey)
        .then((response) => {
          const bar = '========================================='
          const shortBar = '===='
          const header = bar + '\n' + shortBar + '  ' + item.name + '\n' + bar

          Helper.debugLog(header)
          Helper.debugLog('Secret: ' + item.secret)
          Helper.debugLog(response)
          this.extractAssets(response)
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    extractAssets(response) {
      if (response && response.balances) {
        for (const balance of response.balances) {
          AssetManager.addAsset({
            symbol: balance.asset_code,
            issuer: balance.asset_issuer
          })
        }
      }
    },
    removeAccountConfirmed() {
      if (this.itemToRemove) {
        StellarAccounts.deleteAccount(this.itemToRemove.publicKey)
      }
    },
    deleteItem(item) {
      this.itemToRemove = null

      if (!StellarUtils.isTestnet()) {
        this.itemToRemove = item
        this.confirmRemoveDialogPing = !this.confirmRemoveDialogPing
      } else {
        StellarAccounts.deleteAccount(item.publicKey)
      }
    },
    refresh() {
      Helper.debugLog('refreshing...')
      StellarUtils.updateBalances(true)
    }
  }
}
</script>

<style lang='scss' scoped>
// list animations
.list-enter-active,
.list-leave-active {
    transition: all 0.2s;
}
/* .list-leave-active below version 2.1.8 */
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: scale(.1);
}

.main-container {
    padding: 6px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    background: steelblue;
    color: white;
    text-align: center;

    .accounts-title {
        font-weight: bold;
        font-size: 1em;
        color: rgba(255,255,255,.7);
    }

    .add-button {
        position: absolute;
        top: 0;
        left: 0;

        button {
            margin: 0;
        }
    }

    .refresh-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }

    .zero-accounts {
        text-align: center;
        padding: 12px 0;
        font-size: 2em;
        color: rgba(255,255,255,.2);
        text-transform: uppercase;
    }

    .accounts {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;

        .account-item {
            position: relative;
            color: black;
            font-size: 0.8em;
            margin: 4px;
            padding: 10px 12px 20px;
            border-radius: 4px;
            background: linear-gradient(to bottom, rgb(255,255,255), rgb(235,235,235));
            box-shadow: 0 2px 2px rgba(0,0,0,.4);
            line-height: 1.25;
            cursor: pointer;

            // for animations - faster?
            backface-visibility: hidden;

            .account-name {
                font-weight: bold;
                margin-bottom: 2px;
                font-size: 1.1em;
            }

            .delete-button {
                &:hover {
                    color: rgba(255, 0, 0, .6);
                }
                color: rgba(0, 0, 0, .3);
                z-index: 1;
                position: absolute;
                // height: 8px;
                // width: 8px;
                margin: 0;
                bottom: -4px;
                right: -4px;

                i {
                    font-size: 18px;
                }
            }
            .action-button-holder {
                z-index: 1;
                position: absolute;
                // height: 8px;
                // width: 8px;
                bottom: -4px;
                left: -4px;
            }
        }
    }
}
</style>
