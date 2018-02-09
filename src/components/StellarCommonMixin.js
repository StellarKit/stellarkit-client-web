 import StellarAccounts from '../js/StellarAccounts.js'
 import StellarUtils from '../js/StellarUtils.js'
 import Helper from '../js/helper.js'

 export default {
   data() {
     return {
       accountsUI: []
     }
   },
   mounted() {
     this.updateAccountsUI()
     Helper.vue().$on('stellar-accounts-updated', this.updateAccountsUI)
   },
   methods: {
     infoForPublicKey(publicKey) {
       StellarUtils.accountInfo(publicKey)
         .then((response) => {
           Helper.debugLog(response)
         })
         .catch((error) => {
           Helper.debugLog(error)
         })
     },
     deleteAccount(item) {
       StellarAccounts.deleteAccount(item.publicKey)
     },
     clickAccount(item) {
       Helper.debugLog('account info...')

       this.infoForPublicKey(item.publicKey)
       Helper.debugLog(item.secret)
       Helper.debugLog(item.name)
     },
     distributorAccount() {
       const result = StellarAccounts.accountWithName('Distributor')
       if (result) {
         return result
       }

       Helper.debugLog('Go to the Tokens tab and create a token first.', 'Error')
       return null
     },
     // private
     updateAccountsUI() {
       this.accountsUI = StellarAccounts.accounts()
     }
   }
 }
