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

  static stripBrackets(rawString) {
    const lineArray = []

    // remove excessive brackets
    const lines = rawString.split('\n')
    let openIndex = -1
    let closeIndex = -1

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

    return rawString
  }

  static toStr(object) {
    const spaces = '  '
    if (object instanceof Error) {
      const json = JSON.stringify(object, null, spaces)

      // returns {} when it fails - check number of keys
      const obj = JSON.parse(json)
      if (Object.keys(obj).length > 0) {
        return this.stripBrackets(json)
      }

      return object.toString()
    } else if (typeof object === 'string') {
      return object
    } else if (typeof object === 'object') {
      return this.stripBrackets(JSON.stringify(object, null, spaces))
    }

    return typeof object
  }

  static debugLog(result, tag = null) {
    let newText = ''

    if (tag) {
      newText += tag + ': '
    }

    newText += this.toStr(result)

    this.emit('console', newText)
  }

  static isFederation(fedString) {
    // modify the email regex
    return true
  }

  static openBrowser(url) {
    if (window.electronAccess) {
      window.electronAccess.openBrowser(url)
    } else {
      window.open(url, '_blank').focus()
    }
  }
}
