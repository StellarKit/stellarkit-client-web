const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')

export default class ReusableStellarViewsModel {
  constructor() {
    this.reset()
  }

  reset() {
    this.symbol = ''

    this.textValue = ''
    this.textValueLabel = 'Label'
    this.textValueHint = 'Hint'

    this.sellAmount = 1000000

    this.souceAccount = null
    this.destAccount = null
    this.fundingAccount = null
    this.signerAccount = null

    this.secretKey = ''
    this.publicKey = ''
    this.fundingMessage = 'Optional: The source account will pay the fee.'

    this.assetAmount = 10

    this.nameValueOneLabel = 'Name'
    this.nameValueTwoLabel = 'Value'
    this.nameValueOneValue = ''
    this.nameValueOneValue = ''

    this.accountName = generateName()

    this.numberValue = 1000000
    this.numberValueLabel = 'Label'
    this.numberValueHint = 'Hint'

    this.assetModel = {
      asset: StellarSdk.Asset.native()
    }
    this.buyingAssetModel = {
      asset: StellarSdk.Asset.native()
    }
    this.sellingAssetModel = {
      asset: StellarSdk.Asset.native()
    }
  }

  setAsset(asset) {
    this.assetModel = {
      asset: asset
    }
  }

  setSellingAsset(asset) {
    this.sellingAssetModel = {
      asset: asset
    }
  }

  setBuyingAsset(asset) {
    this.buyingAssetModel = {
      asset: asset
    }
  }

  getAsset(asset) {
    return this.assetModel.asset
  }

  getSellingAsset(asset) {
    return this.sellingAssetModel.asset
  }

  getBuyingAsset(asset) {
    return this.buyingAssetModel.asset
  }
}