const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')

export default class ReusableStellarViewsModel {
  constructor() {
    this.reset()
  }

  reset() {
    this.homeDomainTitle = 'Home Domain'
    this.homeDomain = ''

    this.sellAmount = 1000000

    this.souceAccount = null
    this.destAccount = null
    this.fundingAccount = null
    this.signerAccount = null

    this.secretKey = ''
    this.publicKey = ''
    this.fundingMessage = 'Optional: The source account will pay the fee.'

    this.assetAmount = 10

    this.accountName = generateName()

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