const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const {
  VueLoaderPlugin
} = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

let common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [{
      enforce: 'pre',
      test: /.(vue|js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      options: {
        fix: true
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader', 'css-loader'
      ],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.styl$/,
      use: [
        'style-loader', 'css-loader', 'stylus-loader'
      ],
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          // name: '[name].[ext]?[hash]'
          name: 'images/[hash].[ext]'
        }
      }, {
        loader: 'img-loader',
        options: {
          enabled: process.env.NODE_ENV === 'production'
        }
      }],
      exclude: /node_modules/
    }]
  },
  devtool: 'eval-source-map',
  mode: 'development'
}

// target differences
const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'dist' || TARGET === 'dev' || TARGET === 'devHTTP') {
  const entry = ['@babel/polyfill', './src/entry.js']
  // const entry = './src/private/entry.js'

  common = merge(common, {
    entry: entry,
    target: 'web',
    output: {
      filename: 'site.js'
    }
  })

  if (TARGET === 'dist') {
    common = merge(common, {
      output: {
        // public path so css images are located
        publicPath: '/'
      }
    })
  }
} else if (TARGET === 'distLib') {
  common = merge(common, {
    entry: ['@babel/polyfill', './src/libEntry.js'],
    output: {
      filename: 'distLib.js',
      library: 'stellar-client-web',
      libraryTarget: 'umd'
    },
    externals: ['jquery']
  })
}

if (process.env.NODE_ENV === 'production') {
  common = merge(common, {
    mode: 'production',
    devtool: false,
    // added to kill all comments, remove if you don't care (16k smaller too)
    optimization: {
      minimizer: [new TerserPlugin({
        terserOptions: {
          cache: true,
          parallel: true,
          compress: false, // ledger nano failing without this
          output: {
            comments: false,
            semicolons: false
          }
        }
      })]
    }
  })
} else {
  // development
}

module.exports = common