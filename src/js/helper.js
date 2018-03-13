import Vue from 'vue'
import Storage from './storage.js'
import HelperImplementation from './HelperImplementation.js'
const StellarSdk = require('stellar-sdk')

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

  static strOK(inString) {
    if (!inString) {
      return false
    }

    return inString.length > 0
  }

  static stripZeros(floatString) {
    // blank string return 0, not 'NaN'
    if (!this.strOK(floatString)) {
      return '0'
    }

    const n = parseFloat(floatString)
    const noZeroes = n.toString() // "1.245"

    // I don't want 5e-7, so bail if has an 'e'
    if (noZeroes.indexOf('e') !== -1) {
      return floatString
    }

    return noZeroes
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

  static stripBrackets(object) {
    const condensedOutput = Helper.get('condensedOutput')
    if (condensedOutput) {
      const lineArray = []

      // remove _links, mostly worthless
      delete object._links
      const rawString = this.stringify(object)

      // remove excessive brackets
      const lines = rawString.split('\n')
      let openIndex = -10
      let closeIndex = -100

      for (const [index, line] of lines.entries()) {
        const trimmed = line.trim()

        if (trimmed.length > 0) {
          const trimmedRight = line.trimRight()

          if (trimmed === '}' || trimmed === '},' || trimmed === ']' || trimmed === '],') {
            closeIndex = index
          } else {
            if (trimmedRight.endsWith('{') || trimmedRight.endsWith('[') || trimmedRight.endsWith(',')) {
              if (trimmed.length > 1) {
                lineArray.push(trimmedRight.substr(0, trimmedRight.length - 1))
              } else {
                openIndex = index
              }
            } else {
              lineArray.push(trimmedRight)
            }
          }
        }
        if ((openIndex - 1) === closeIndex) {
          lineArray.push(' ')
          openIndex = -1
        }
      }

      if (lineArray.length > 0) {
        const arrayStr = lineArray.join('\n')

        // remove quotes
        return arrayStr.replace(/"/g, '')
      }
    }

    return this.stringify(object)
  }

  static stringify(object) {
    function replacer(key, value) {
      if (key === 'data' && Array.isArray(value)) {
        return 'removed'
      }
      return value
    }

    const spaces = '  '
    const json = JSON.stringify(object, replacer, spaces)

    return json
  }

  static toast(message, error = false, location = 'app') {
    this.emit('toast', message, error, location)
  }

  static toStr(object) {
    if (!object) {
      return 'null'
    }

    const expandXDR = Helper.get('expandXDR')

    if (object instanceof Error) {
      const json = this.stringify(object)

      // returns {} when it fails - check number of keys
      const obj = JSON.parse(json)
      if (Object.keys(obj).length > 0) {
        if (expandXDR) {
          if (obj.data && obj.data.extras && obj.data.extras.envelope_xdr) {
            obj.data.extras.envelope_xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(obj.data.extras.envelope_xdr, 'base64')
          }
        }

        return this.stripBrackets(obj)
      }

      return object.toString()
    } else if (typeof object === 'string') {
      return object
    } else if (typeof object === 'object') {
      if (expandXDR) {
        if (object.envelope_xdr) {
          object.envelope_xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(object.envelope_xdr, 'base64')
        }
        if (object.result_xdr) {
          object.result_xdr = StellarSdk.xdr.TransactionResult.fromXDR(object.result_xdr, 'base64')
        }
        if (object.result_meta_xdr) {
          object.result_meta_xdr = StellarSdk.xdr.TransactionMeta.fromXDR(object.result_meta_xdr, 'base64')
        }
      }

      // base64 decode for values in manageData operation
      if (object.data_attr) {
        for (const name of Object.keys(object.data_attr)) {
          Helper.debugLog(object.data_attr[name])
          object.data_attr[name] = window.atob(object.data_attr[name])
        }
      }

      return this.stripBrackets(object)
    }

    return typeof object
  }

  static debugLog(input, tag = null) {
    let newText = ''

    if (tag) {
      newText += tag + ': '
    }

    let foundRecords = false
    if (input && typeof input === 'object') {
      if (Array.isArray(input.records)) {
        for (const obj of input.records) {
          newText += this.toStr(obj)
          newText += '\n'
          foundRecords = true
        }
      }
    }

    if (!foundRecords) {
      newText += this.toStr(input)
    }

    if (Helper.strOK(newText)) {
      this.emit('console', newText)
    }
  }

  static clearLog() {
    this.emit('clear-console')
  }

  static isFederation(fedString) {
    const regEx = /^\w+([.-]?\w+)*\*\w+([.-]?\w+)*(\.\w{2,10})+$/

    if (regEx.test(fedString)) {
      return true
    }
    return false
  }

  static openBrowser(url) {
    const handled = HelperImplementation.openBrowser(url)

    if (!handled) {
      window.open(url, '_blank').focus()
    }
  }

  static applicationName() {
    const name = HelperImplementation.applicationName()

    if (name) {
      return name
    }

    return 'Stellar Army'
  }
}