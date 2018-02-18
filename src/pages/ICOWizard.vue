<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <div class='page-title'>
    ICO Wizard
  </div>

  <wizard-view v-on:click-nav="clickWizardNav">
    <div slot='content'>
      <div v-if='pageIndex===0'>
        Hello world
      </div>
      <div v-if='pageIndex===1'>
        OK, got it
      </div>
    </div>
  </wizard-view>
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
      numberOfPages: 2
    }
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
// dddd
</style>
