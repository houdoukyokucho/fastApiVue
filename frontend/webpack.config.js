const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const mode = process.env.MODE == 'development' ? 'development': 'production'


console.log(`---------- ${mode} ----------`)
module.exports = {
  mode: mode,
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../backend/static/dist/'),
    publicPath: '../backend/static/dist/'
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          "sass-loader",
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // [backend/static/dist/]配下
              outputPath: './images',
              publicPath: './images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new BundleTracker({
      path: path.resolve(__dirname, '../backend/static/dist/'),
      filename: 'webpack-stats.json',
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js', 
    },
    extensions: ['.js', '.vue']
  },
};