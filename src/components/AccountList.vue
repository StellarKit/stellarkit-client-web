<template>
<div class='main-container'>
  <v-btn class='add-button' icon dark @click="createAccount()">
    <v-tooltip open-delay='800' bottom>
      <v-icon slot='activator'>&#xE147;</v-icon>
      <span>Create new account</span>
    </v-tooltip>
  </v-btn>
  <v-btn class='refresh-button' icon dark @click="refresh()">
    <v-tooltip open-delay='800' bottom>
      <v-icon slot='activator'>&#xE5D5;</v-icon>
      <span>Refresh account balances</span>
    </v-tooltip>
  </v-btn>

  <div class='accounts-title'>Accounts - click for info</div>
  <div v-if='items.length === 0' class='zero-accounts'>
    Create an account
  </div>
  <div v-else class='accounts'>
    <div class='account-item' v-for="item in items" @click.stop='clickItem(item)' :key='item.name'>
      <v-tooltip open-delay='200' bottom>
        <div slot="activator">
          <div class='account-name'>{{item.name}}</div>
          <div>XLM: {{item.XLM}}</div>
          <div>LMB: {{item.LMB}}</div>
        </div>
        <span>{{item.publicKey}}</span>
      </v-tooltip>
      <v-btn class='delete-button' icon small @click.stop='deleteItem(item)'>
        <v-icon>&#xE15C;</v-icon>
      </v-btn>
    </div>
  </div>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  TimelineMax,
  Power3
} from 'gsap'
import $ from 'jquery'

export default {
  props: ['items'],
  data() {
    return {
      timeline: null
    }
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
    createAccount() {
      Helper.debugLog('creating account...')

      StellarUtils.createTestAccount()
        .then((result) => {
          Helper.debugLog(result)
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    clickItem(item) {
      this.$emit('click-item', item)
    },
    deleteItem(item) {
      this.$emit('delete-item', item)
    },
    refresh() {
      Helper.debugLog('refreshing...')
      StellarUtils.updateBalances(true)
    }
  }
}
</script>

<style lang='scss' scoped>
.main-container {
    padding: 10px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    background: steelblue;
    color: white;
    text-align: center;

    .accounts-title {
        font-weight: bold;
        font-size: 1.1em;
    }

    .add-button {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
    }

    .refresh-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }

    .zero-accounts {
        text-align: center;
        padding: 30px 0;
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
            font-size: 0.85em;
            margin: 8px 4px 0;
            padding: 10px 12px 20px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 2px 2px rgba(0,0,0,.4);
            line-height: 1.25;

            .account-name {
                font-weight: bold;
                margin-bottom: 2px;
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
        }
    }
}
</style>
