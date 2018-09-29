import Helper from '../js/helper.js'
import SettingsStore from '../js/SettingsStore.js'
import {
  HorizonServer,
  StellarAPI
} from 'stellar-js-utils'

export default class StellarServer {
  constructor() {
    this.serverChanged = true

    Helper.vue().$on('settings-updated', (key) => {
      if (key === 'server') {
        this.serverChanged = true
      }
    })
  }

  server() {
    this._setupServer()
    return this._horizon.server()
  }

  isTestnet() {
    this._setupServer()
    return this._horizon.isTestnet()
  }

  serverAPI() {
    this._setupServer()
    return this._serverAPI
  }

  serverURL() {
    this._setupServer()
    return this._horizon.serverURL()
  }

  _setupServer() {
    if (this.serverChanged) {
      this.serverChanged = false

      const serverKey = SettingsStore.get('server', 'testnet')

      if (this._serverKey !== serverKey) {
        this._horizon = this._createHorizonServer(serverKey)
        this._serverKey = serverKey

        this._serverAPI = new StellarAPI(this._horizon)
      }
    }
  }

  _createHorizonServer(network) {
    let result

    switch (network) {
      case 'testnet':
        result = new HorizonServer('https://horizon-testnet.stellar.org', true)
        break
      case 'mainnet':
        result = new HorizonServer('https://horizon.stellar.org', false)
        break
      case 'local':
        result = new HorizonServer('http://192.168.1.82:8000', true, {
          allowHttp: true
        })
        break
      case 'stellarkit':
        result = new HorizonServer('https://stellarkit.io:8000', true)
        break
      default:
        console.log('ERROR: switch failed')
        break
    }

    return result
  }
}