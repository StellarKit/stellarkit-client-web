<template>
<div>
  <account-list :items="accountsUI" />

  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <div class='main-container'>
    <v-btn round small color='primary' @click="createMultisig">Create Multisig Account</v-btn>
  </div>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import AccountList from '../components/AccountList.vue'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      showDialogPing: false
    }
  },
  components: {
    'account-list': AccountList,
    'instructions-header': InstructionsHeader
  },
  methods: {
    createMultisig() {
      Helper.debugLog('okkkkkkkkkkkkkk')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../scss/styles.scss';

.main-container {
    display: flex;
    flex-direction: column;
    align-items:: center;
}
</style>
