 import Helper from '../js/helper.js'
 import {
   StellarAPIServer,
   StellarAPI
 } from 'stellar-js-utils'

 export default class StellarServer {
   server() {
     this._setupServer()
     return this._stellarAPIServer.server()
   }

   serverAPI() {
     this._setupServer()
     return this._serverAPI
   }

   friendBotServer() {
     if (!this._friendBotServer) {
       this._friendBotServer = this._createStellarAPIServer('testnet')
     }

     return this._friendBotServer.server()
   }

   serverURL() {
     this._setupServer()

     return this._stellarAPIServer.serverURL()
   }

   _setupServer() {
     const serverKey = Helper.get('server')

     if (this._serverKey !== serverKey) {
       this._stellarAPIServer = this._createStellarAPIServer(serverKey)
       this._serverKey = serverKey

       this._serverAPI = new StellarAPI(this._stellarAPIServer)
     }
   }

   _createStellarAPIServer(network) {
     let result

     switch (network) {
       case 'testnet':
         result = new StellarAPIServer('https://horizon-testnet.stellar.org', true)
         break
       case 'mainnet':
         result = new StellarAPIServer('https://horizon.stellar.org', false)
         break
       case 'local':
         result = new StellarAPIServer('http://192.168.1.82:8000', true, {
           allowHttp: true
         })
         break
       case 'stellarkit':
         result = new StellarAPIServer('https://stellarkit.io:8000', true)
         break
       default:
         console.log('ERROR: switch failed')
         break
     }

     return result
   }
 }
