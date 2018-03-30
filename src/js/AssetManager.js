import Helper from '../js/helper.js'

class AssetManager {
  assets() {
    // we have to load lazy since the prefs will not be loaded at constructor
    if (!this._assets) {
      this._assets = this.load()
    }

    // return a copy, the UI might try and modify this array
    return this._assets.slice()
  }

  addAsset(asset) {
    if (asset && Helper.strOK(asset.symbol) && Helper.strOK(asset.issuer)) {
      this._assets.push(asset)

      this.save()

      return true
    }

    return false
  }

  deleteAsset(asset) {
    const index = this._indexOfAsset(asset)

    if (index !== -1) {
      this._assets.splice(index, 1)

      this.save()

      return true
    }

    return false
  }

  _indexOfAsset(asset) {
    for (const [index, val] of this._assets.entries()) {
      if (asset.issuer === val.issuer && asset.symbol === val.symbol) {
        return index
      }
    }

    return -1
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

        Helper.set('assets', this._assets)
      }, 500)
    }
  }
}

const instance = new AssetManager()

export default instance