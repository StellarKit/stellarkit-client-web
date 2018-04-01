 import StellarAccounts from '../js/StellarAccounts.js'
 import Helper from '../js/helper.js'

 export default {
   data() {
     return {
       accountsUI: [],
       accountsTag: null
     }
   },
   mounted() {
     this.updateAccountsUI()
     Helper.vue().$on('stellar-accounts-updated', this.updateAccountsUI)
     Helper.vue().$on('stellar-network-updated', this.updateAccountsUI)
   },
   methods: {
     distributorAccount() {
       const result = StellarAccounts.accountWithName('Distributor')
       if (result) {
         return result
       }

       Helper.debugLog('Go to the Tokens tab and create a token first.', 'Error')
       return null
     },
     setAccountsTag(tag) {
       this.accountsTag = tag

       this.updateAccountsUI()
     },
     // private
     updateAccountsUI() {
       this.accountsUI = StellarAccounts.accounts()

       if (this.accountsTag) {
         this.accountsUI = this.accountsUI.filter(value => {
           return value.tag === this.accountsTag
         })
       }
     }
   }
 }