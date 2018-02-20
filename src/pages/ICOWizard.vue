<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='page-title'>
    ICO Wizard
    <div class='page-subtitle'>
      Under Construction
    </div>
  </div>

  <div class='columns'>
    <wizard-view v-on:click-nav="clickWizardNav" :title='pageTitle'>
      <div slot='content'>
        <div v-if='pageIndex===0'>
          <div class='step-content'>
            Give your asset a symbol and create an issuing account. Symbol can be 1-12 characters long

            <v-text-field label="Asset Symbol" v-model.trim="assetSymbol"></v-text-field>
            <v-text-field label="Amount" type='number' v-model.trim="tokenAmount"></v-text-field>

          </div>
        </div>
        <div v-if='pageIndex===1'>
          <div class='step-title'>
            Give your asset a symbol and create an issuing account.
          </div>
        </div>
      </div>
    </wizard-view>

    <div class='summary-view'>
      <div class='operations-item' v-for="item in summaryItems" :key=item.id>
        <div class='item-name'>
          {{item.name}}:
        </div>
        <div class='item-value'>
          {{item.value}}
        </div>
      </div>
      </summary-view>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import WizardView from '../components/WizardView.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'wizard-view': WizardView
  },
  data() {
    return {
      pageIndex: 0,
      numberOfPages: 2,
      pageTitle: '',
      tokenAmount: 0,
      assetSymbol: '',
      summaryItems: [{
          name: 'Symbol',
          value: 'DUH'
        },
        {
          name: 'Issuer',
          value: 'GHSDFSDFASDFASDFASDFASDFSADF'
        },
        {
          name: 'Distributor',
          value: 'GHSDFSDFASDFASDFASDFASDFSADF'
        }
      ],
      pageTitles: [
        'Create Asset',
        'Create Accounts',
        'Set Trust',
        'Create Tokens',
        'Manage Offer'
      ]
    }
  },
  mounted() {
    this.updatePageIndex(0)
  },
  methods: {
    updatePageIndex(tabIndex) {
      this.pageIndex = tabIndex

      if (this.pageIndex >= this.numberOfPages) {
        this.pageIndex = 0
      }
      if (this.pageIndex < 0) {
        this.pageIndex = this.numberOfPages - 1
      }

      this.pageTitle = 'Step #' + (this.pageIndex + 1) + '. ' + this.pageTitles[this.pageIndex]
    },
    clickWizardNav(id) {
      switch (id) {
        case 'previous':
          this.updatePageIndex(this.pageIndex - 1)
          break
        case 'next':
          this.updatePageIndex(this.pageIndex + 1)
          break
        default:
          console.log('click not handled')
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.columns {
    display: flex;
    justify-content: center;
    padding: 20px;

    .left-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
    }
    .right-col {
        display: flex;
        flex: 1 1 50%;
        justify-content: center;
    }

    .summary-view {
        display: flex;
        flex: 0 1 400px;
        flex-direction: column;

        .operations-item {
            display: flex;

            &:nth-child(odd) {
                background: rgba(0, 0, 0, .02);
            }

            .item-name {
                text-align: right;
                padding-right: 5px;
                font-weight: bold;
                flex: 1 0 20%;
            }

            .item-value {
                text-align: left;
                flex: 1 0 50%;
                padding-left: 5px;
            }
        }
    }
}
</style>
