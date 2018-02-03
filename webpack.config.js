const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = {
  output: {
    path: path.resolve(__dirname, './dist'),
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
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
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
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map'
}

// target differences
const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'dist' || TARGET === 'dev') {
  let mergedOptions = merge(common, {
    entry: './src/entry.js',
    target: 'web',
    output: {
      filename: 'site.js'
    },
    externals: [
      // without this, we'll get two copies of jquery and triggers will fail
      // also package will be huge
      'jquery',
      'stellar-sdk',
      'stellar-ledger-api'
    ]
  })

  if (TARGET === 'dist') {
    mergedOptions = merge(mergedOptions, {
      output: {
        // public path so css images are located
        publicPath: '/'
      }
    })
  }

  module.exports = mergedOptions
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'none'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        passes: 2
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  // development
  module.exports.plugins = (module.exports.plugins || []).concat([
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin()
  ])
}
