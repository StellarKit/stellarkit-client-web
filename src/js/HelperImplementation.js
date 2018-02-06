// overridden in Electron app to modify behavior

export default class HelperImplementation {
  static setImplementation(implemenation) {
    this.implemenation = implemenation
  }

  static openBrowser(url) {
    if (this.implemenation) {
      this.implemenation.openBrowser(url)
      return true
    }

    return false
  }

  static nodeEnv() {
    if (this.implemenation) {
      return this.implemenation.nodeEnv()
    }

    return false
  }

  static applicationName() {
    if (this.implemenation) {
      return this.implemenation.applicationName()
    }

    return null
  }
}
