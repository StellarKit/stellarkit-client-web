import Helper from './helper.js'
import LocalStorage from './localStorage.js'

export default class SettingsStore {
  static setup(customStorage = null) {
    this.storage = customStorage

    return LocalStorage.init()
  }

  static get(key, defaultValue = undefined, db = false) {
    let result

    if (db && this.storage) {
      result = this.storage.get(key, defaultValue)
    } else {
      result = LocalStorage.get(key)
    }

    // some defaults
    if (result === undefined && defaultValue !== undefined) {
      result = defaultValue
    }

    return result
  }

  static set(key, value, db = false) {
    if (db && this.storage) {
      this.storage.set(key, value)
    } else {
      LocalStorage.set(key, value)
    }
  }

  static notify(keys) {
    for (const key of keys) {
      Helper.emit('settings-updated', key)
    }
  }
}