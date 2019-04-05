class TabsManager {
  constructor() {
    this._tabs = this._defaultTabs()
  }

  _defaultTabs() {
    return [
      {
        icon: String.fromCharCode('0xE88A'),
        tooltip: 'Common Actions',
        path: '/'
      }, {
        icon: String.fromCharCode('0xE3E7'),
        tooltip: 'ICO Manager',
        path: '/ico'
      }, {
        icon: String.fromCharCode('0xE889'),
        tooltip: 'History Viewer',
        path: '/history'
      }, {
        icon: String.fromCharCode('0xE8C9'),
        tooltip: 'Live Trades',
        path: '/trades'
        // }, {
        //   icon: String.fromCharCode('0xE263'),
        //   tooltip: 'Create Token Tutorial',
        //   path: '/token'
        // }, {
        //   icon: String.fromCharCode('0xE86C'),
        //   tooltip: 'Allow Trust',
        //   path: '/trust'
        // }, {
        //   icon: String.fromCharCode('0xE897'),
        //   tooltip: 'Locked Tokens',
        //   path: '/locked'
        // }, {
        //   icon: String.fromCharCode('0xE851'),
        //   tooltip: 'Buy token with Bifrost',
        //   path: '/buytoken'
        // }, {
        //   icon: String.fromCharCode('0xE1E0'),
        //   tooltip: 'Experiments',
        //   path: '/experiments'
        //   // disabled: true
      }
    ]
  }

  getTabs() {
    return this._tabs
  }

  setTabs(tabs) {
    this._tabs = tabs
  }
}

const instance = new TabsManager()

export default instance
