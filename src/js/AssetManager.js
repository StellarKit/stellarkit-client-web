import Helper from '../js/helper.js'

class AssetManager {
  assets() {
    // return a copy, the UI might try and modify this array
    return this._lazyAssets().slice()
  }

  addAsset(asset) {
    Helper.debugLog(asset)

    if (asset && Helper.strOK(asset.symbol) && Helper.strOK(asset.issuer)) {
      const index = this._indexOfAsset(asset)

      // don't add same one twice
      if (index === -1) {
        this._lazyAssets().push(asset)

        this.save()

        return true
      }
    }

    return false
  }

  deleteAsset(asset) {
    const index = this._indexOfAsset(asset)

    if (index !== -1) {
      this._lazyAssets().splice(index, 1)

      this.save()

      return true
    }

    return false
  }

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
      this._assets = this.load()
    }

    return this._assets
  }

  load() {
    const result = Helper.get('assets')

    if (!result) {
      return []
    }

    return result
  }

  save() {
    // alert ui to update
    Helper.emit('assets-updated')

    // save throttle, probably not necessary, but couldn't hurt
    if (!this._saving) {
      this._saving = true

      setTimeout(() => {
        this._saving = false

        Helper.set('assets', this._lazyAssets())
      }, 500)
    }
  }
}

const instance = new AssetManager()

export default instance