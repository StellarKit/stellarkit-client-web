import Vue from 'vue'
import Storage from './storage.js'

export default class Helper {
  static vue() {
    // class variable, seems to work, but not 100% sure it's good
    if (!this.vueInstance) {
      this.vueInstance = new Vue()
    }

    return this.vueInstance
  }

  static emit(event, ...message) {
    this.vue().$emit(event, ...message)
  }

  static strlen(inString) {
    if (!inString) {
      return 0
    }

    return inString.length
  }

  static keyForKey(key) {
    return 'pref-' + key
  }

  static get(key) {
    let result = Storage.get(this.keyForKey(key))

    // some defaults
    if (!result) {
      switch (key) {
        case 'server':
          result = 'testnet'
          break
        default:
          break
      }
    }

    return result
  }

  static set(key, value) {
    Storage.set(this.keyForKey(key), value)
  }

  static toStr(object) {
    if (object instanceof Error) {
      const json = JSON.stringify(object, null, '  ')

      // seems to return {} when it fails?
      const obj = JSON.parse(json)
      if (Object.keys(obj).length > 0) {
        return json
      }

      return object.toString()
    } else if (typeof object === 'string') {
      return object
    } else if (typeof object === 'object') {
      return JSON.stringify(object, null, '  ')
    }

    return typeof object
  }

  static debugLog(result, tag = null) {
    let newText = ''

    if (tag) {
      newText += tag + ': '
    }

    newText += '<pre>' + this.toStr(result) + '</pre>'

    this.emit('console', newText)
  }

  static isFederation(fedString) {
    // modify the email regex
    return true
  }

  static openBrowser(url) {
    if (window.electronAccess) {
      window.electronAccess.implementation()
    } else {
      window.open(url, '_blank').focus()
    }
  }
}
