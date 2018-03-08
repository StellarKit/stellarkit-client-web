const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

let common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /.(vue|js)$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
              // name: '[name].[ext]?[hash]'
              name: 'images/[hash].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: process.env.NODE_ENV === 'production'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'eval-source-map',
  mode: 'development'
}

// target differences
const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'dist' || TARGET === 'dev') {
  common = merge(common, {
    entry: './src/entry.js',
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
    entry: './src/libEntry.js',
    output: {
      filename: 'distLib.js',
      library: 'stellar-client-web',
      libraryTarget: 'umd'
    },
    externals: [
      'jquery'
    ]
  })
}

if (process.env.NODE_ENV === 'production') {
  common = merge(common, {
    mode: 'production',
    devtool: false
  })
} else {
  // development
}

module.exports = common