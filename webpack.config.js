const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = {
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
    }
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
} else if (TARGET === 'distLib') {
  let mergedOptions = merge(common, {
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
  module.exports = mergedOptions
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ])
} else {
  // development
  module.exports.plugins = (module.exports.plugins || []).concat([
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin()
  ])
}
