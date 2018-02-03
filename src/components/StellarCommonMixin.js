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
     debugLog(result, tag = null) {
       let newText = ''

       if (tag) {
         newText += tag + ': '
       }

       newText += '<pre>' + this.su.toStr(result) + '</pre>'

       Helper.emit('console', newText)
     },
     infoForPublicKey(publicKey) {
       this.su.accountInfo(publicKey)
         .then((response) => {
           this.debugLog(response)
         })
         .catch((error) => {
           this.debugLog(error)
         })
     },
     deleteAccount(item) {
       StellarAccounts.deleteAccount(item.publicKey)
     },
     clickAccount(item) {
       this.debugLog('account info...')

       this.infoForPublicKey(item.publicKey)
       this.debugLog(item.secret)
       this.debugLog(item.name)
     },
     createAccount() {
       this.debugLog('create account:')

       this.su.createTestAccount()
         .then((result) => {
           this.debugLog(result)
         })
         .catch((error) => {
           this.debugLog(error)
         })
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
