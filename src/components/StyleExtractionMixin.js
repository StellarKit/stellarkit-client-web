import Helper from '../js/helper.js'
const $ = require('jquery')

export default {
  data() {
    return {}
  },
  methods: {
    printTokenInfo(element) {
      // insert an iframe into the DOM
      // print iframe window.  popups could be blocked, so frame is safter than opening a new window
      const iframe = $('<iframe></iframe>')[0]

      // const element = document.createElement('iframe')
      iframe.setAttribute('id', 'printf')
      iframe.setAttribute('name', 'printf')

      document.body.appendChild(iframe)

      const frameWindow = window.frames['printf']
      frameWindow.document.head.innerHTML = '<style>body{font-family: Arial, Helvetica, sans-serif;}</style>'
      frameWindow.document.body.innerHTML = this.styledElementForPrinting(element[0])

      frameWindow.print()

      document.body.removeChild(iframe)
    },
    styledElementForPrinting(inElement) {
      const printContents = document.createElement('div')
      printContents.setAttribute('class', 'print-wrapper')

      const table = inElement.cloneNode(true)
      printContents.appendChild(table)

      const mainPrint = document.createElement('div')
      mainPrint.setAttribute('style', 'display:none;')
      mainPrint.appendChild(printContents)
      const inDomElement = inElement.parentNode.appendChild(mainPrint)

      this.loopNodesCollectStyles([inDomElement])

      inElement.parentNode.removeChild(inDomElement)
      return inDomElement.innerHTML
    },
    condenseStyle(stylesObj, style) {
      if (stylesObj[style + '-top'] === '0px' &&
        stylesObj[style + '-right'] === '0px' &&
        stylesObj[style + '-bottom'] === '0px' &&
        stylesObj[style + '-left'] === '0px') {
        stylesObj[style + '-top'] = ''
        stylesObj[style + '-right'] = ''
        stylesObj[style + '-bottom'] = ''
        stylesObj[style + '-left'] = ''
        stylesObj[style] = '0px'
      }

      return stylesObj
    },
    condenseBorder(stylesObj) {
      if (stylesObj['border-top-left-radius'] === '0px' &&
        stylesObj['border-top-right-radius'] === '0px' &&
        stylesObj['border-bottom-left-radius'] === '0px' &&
        stylesObj['border-bottom-left-radius'] === '0px') {
        stylesObj['border-top-left-radius'] = ''
        stylesObj['border-top-right-radius'] = ''
        stylesObj['border-bottom-left-radius'] = ''
        stylesObj['border-bottom-right-radius'] = ''
      }

      if (stylesObj['border-top-style'] === 'none' &&
        stylesObj['border-left-style'] === 'none' &&
        stylesObj['border-bottom-style'] === 'none' &&
        stylesObj['border-right-style'] === 'none') {
        stylesObj['border-top-style'] = ''
        stylesObj['border-left-style'] = ''
        stylesObj['border-bottom-style'] = ''
        stylesObj['border-right-style'] = ''

        stylesObj['border-top-width'] = ''
        stylesObj['border-top-color'] = ''
        stylesObj['border-right-width'] = ''
        stylesObj['border-right-color'] = ''
        stylesObj['border-bottom-width'] = ''
        stylesObj['border-bottom-color'] = ''
        stylesObj['border-left-width'] = ''
        stylesObj['border-left-color'] = ''
      }
      if (stylesObj['text-decoration-line'] === 'none') {
        stylesObj['text-decoration-line'] = ''
        stylesObj['text-decoration-style'] = ''
        stylesObj['text-decoration-color'] = ''
        stylesObj['text-decoration'] = 'none'
      }

      return stylesObj
    },
    collectStyles(element, params) {
      let result = ''

      const style = window.getComputedStyle(element, null)

      const targetStyles = ['justify', 'font', 'box', 'font', 'text-align', 'align', 'border', 'text-decoration', 'margin', 'padding', 'color',
        'display', 'width', 'min', 'height', 'flex', 'left', 'right', 'top', 'bottom', 'position',
        'max', 'background', 'overflow'
      ]

      // we don't want fonts to load since we don't give it time and it will fail and produce console output
      const exclude = [
        'background-blend-mode',
        'background-clip',
        'background-attachment',
        'background-origin',
        'border-image-outset',
        'border-image-repeat',
        'border-image-slice',
        'border-image-width',
        'font-kerning',
        'font-stretch',
        'font-variant',
        'overflow-anchor',
        'overflow-wrap',
        'text-align-last',
        'font-variant-ligatures',
        'color-interpolation',
        'color-interpolation-filters',
        'color-rendering',
        'text-decoration-skip'
      ]

      let stylesObj = {}
      for (let i = 0; i < style.length; i++) {
        const name = style[i]

        if (exclude.indexOf(name) !== -1) {
          continue
        }

        for (let target = 0; target < targetStyles.length; target++) {
          if (name.indexOf(targetStyles[target]) === 0) {
            const value = style.getPropertyValue(name)
            stylesObj[name] = value

            if (value === 'none') {
              if (name === 'background-image' ||
                name === 'border-image-source' ||
                name === 'max-height' ||
                name === 'max-width' ||
                name === 'box-shadow') {
                stylesObj[name] = ''
              }
            } else if (value === 'auto') {
              if (name === 'top' || name === 'bottom' || name === 'left' || name === 'right' ||
                name === 'width' || name === 'height' || name === 'background-size' || name === 'alignment-baseline') {
                stylesObj[name] = ''
              }
            } else if (value === 'normal') {
              if (name === 'justify-items' || name === 'justify-self' || name === 'align-content' || name === 'align-items' ||
                name === 'align-self' || name === 'height' || name === 'background-size') {
                stylesObj[name] = ''
              }
            } else if (value === '0px') {
              if (name === 'min-height' || name === 'min-width') {
                stylesObj[name] = ''
              }
            }
          } else {
            // const v = style.getPropertyValue(name)
            // console.log(name + ' ' + v)
          }
        }
      }

      stylesObj = this.condenseStyle(stylesObj, 'margin')
      stylesObj = this.condenseStyle(stylesObj, 'padding')
      stylesObj = this.condenseBorder(stylesObj)

      for (const n in stylesObj) {
        const val = stylesObj[n]

        if (Helper.strlen(val) > 0) {
          result += n + ':' + val + ';'
        }
      }

      return result
    },
    loopNodesCollectStyles(elements) {
      for (let n = 0; n < elements.length; n++) {
        const currentElement = elements[n]

        currentElement.setAttribute('style', this.collectStyles(currentElement))

        const children = currentElement.children
        if (children && children.length) {
          this.loopNodesCollectStyles(children)
        }
      }
    }
  }
}