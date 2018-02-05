<template>
<div class='main-container'>
  <v-btn class='add-button' icon dark @click="createAccount()">
    <v-tooltip open-delay='800' bottom>
      <v-icon large slot='activator'>&#xE147;</v-icon>
      <span>Create new account</span>
    </v-tooltip>
  </v-btn>
  <v-btn class='refresh-button' icon dark @click="refresh()">
    <v-tooltip open-delay='800' bottom>
      <v-icon large slot='activator'>&#xE5D5;</v-icon>
      <span>Refresh account balances</span>
    </v-tooltip>
  </v-btn>

  <div>Accounts - Click for Info</div>

  <div class='accounts'>
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

export default {
  props: ['items'],
  data() {
    return {}
  },
  methods: {
    createAccount() {
      Helper.debugLog('create account:')

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
    padding-top: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: steelblue;
    color: white;
    text-align: center;

    .add-button {
        position: absolute;
        top: 2px;
        left: 2px;
    }

    .refresh-button {
        position: absolute;
        top: 2px;
        right: 2px;
    }

    .accounts {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        padding: 10px;

        .account-item {
            position: relative;
            color: black;
            font-size: 0.85em;
            margin: 4px;
            padding: 10px 12px 20px;
            border: solid 1px rgba(0,0,0,.4);
            border-radius: 8px;
            background: white;
            box-shadow: 0 7px 12px -7px rgba(0,0,0,.7);
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
