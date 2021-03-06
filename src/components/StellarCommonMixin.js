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
     Helper.vue().$on('settings-updated', (key) => {
       if (key === 'server') {
         this.updateAccountsUI()
       }
     })
   },
   methods: {
     distributor() {
       const result = StellarAccounts.accountWithName('Distributor: LMB')
       if (result) {
         return result
       }

       Helper.debugLog('Go to the Tokens tab and create a token first.', 'Error')
       return null
     },
     issuer() {
       const result = StellarAccounts.accountWithName('Issuer: LMB')
       if (result) {
         return result
       }

       Helper.debugLog('Go to the Tokens tab and create a token first.', 'Error')
       return null
     },
     tokenBuyer() {
       const result = StellarAccounts.accountWithName('Buyer: LMB')
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