import Helper from '../js/helper.js'
import StellarUtils from './StellarUtils.js'

class AssetManagerImp {
  constructor(prefKey) {
    this.prefKey = prefKey
  }

  assets() {
    // return a copy, the UI might try and modify this array
    return this._lazyAssets().slice()
  }

  addAsset(asset) {
    if (asset && Helper.strOK(asset.symbol) && Helper.strOK(asset.issuer)) {
      const index = this._indexOfAsset(asset)

      // don't add same one twice
      if (index === -1) {
        this._lazyAssets().push(asset)

        this._save()

        return true
      }
    }

    return false
  }

  deleteAsset(asset) {
    const index = this._indexOfAsset(asset)

    if (index !== -1) {
      this._lazyAssets().splice(index, 1)

      this._save()

      return true
    }

    return false
  }

  // ===============================================================
  // Private
  // ===============================================================

  _indexOfAsset(asset) {
    for (const [index, val] of this._lazyAssets().entries()) {
      if (asset.issuer === val.issuer && asset.symbol === val.symbol) {
        return index
      }
    }

    return -1
  }

  _lazyAssets() {
    // we have to load lazy since the prefs will not be loaded at constructor
    if (!this._assets) {
      this._assets = this._load()
    }

    return this._assets
  }

  _load() {
    const result = Helper.get(this.prefKey)

    if (!result) {
      return []
    }

    return result
  }

  _save() {
    // alert ui to update
    Helper.emit('assets-updated')

    // save throttle, probably not necessary, but couldn't hurt
    if (!this._saving) {
      this._saving = true

      setTimeout(() => {
        this._saving = false

        Helper.set(this.prefKey, this._lazyAssets())
      }, 500)
    }
  }
}

class AssetManager {
  constructor() {
    this.publicNet = new AssetManagerImp('public')
    this.testNet = new AssetManagerImp('test')

    // if network updates, we need to signal any popups to refresh
    Helper.vue().$on('stellar-network-updated', () => {
      Helper.emit('assets-updated')
    })
  }

  assets() {
    if (StellarUtils.isTestnet()) {
      return this.testNet.assets()
    }

    return this.publicNet.assets()
  }

  addAsset(asset) {
    if (StellarUtils.isTestnet()) {
      return this.testNet.addAsset(asset)
    }

    return this.publicNet.addAsset(asset)
  }

  deleteAsset(asset) {
    if (StellarUtils.isTestnet()) {
      return this.testNet.deleteAsset(asset)
    }

    return this.publicNet.deleteAsset(asset)
  }
}

const instance = new AssetManager()

export default instance