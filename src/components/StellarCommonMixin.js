 import StellarAccounts from '../js/StellarAccounts.js'
 import StellarUtils from '../js/StellarUtils.js'
 import Helper from '../js/helper.js'

 export default {
   data() {
     return {
       su: null,
       accountsUI: [],
       tokensUI: []
     }
   },
   created() {
     this.su = new StellarUtils()
   },
   mounted() {
     this.updateAccountsUI()
     Helper.vue().$on('stellar-accounts-updated', this.updateAccountsUI)
   },
   methods: {
     infoForPublicKey(publicKey) {
       this.su.accountInfo(publicKey)
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
     createAccount() {
       Helper.debugLog('create account:')

       this.su.createTestAccount()
         .then((result) => {
           Helper.debugLog(result)
         })
         .catch((error) => {
           Helper.debugLog(error)
         })
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

       // for tokens page
       this.tokensUI = []
       this.accountsUI.forEach((acct) => {
         switch (acct.page) {
           case 'token':
             this.tokensUI.push(acct)
             break
           default:
             break
         }
       })
     }
   }
 }
