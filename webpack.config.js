const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const rupture = require('rupture');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        use: 'pug-loader'
      },
      {
        test: /\.styl/,
        use: [
          'style-loader', 
          { 
            loader: 'css-loader', 
            options: { importLoaders: 1 } 
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              use: [rupture()],
            },
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      title: 'Political Translator',
      hash: true, 
      template: './src/index.pug'
    }),
    new webpack.optimize.UglifyJsPlugin({}), 
    new CopyWebpackPlugin([
      { from: './src/medias/', to: './medias' },
      { from: './src/favicon.ico', to: './' },
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new WebpackPwaManifest({
      name: 'Political Translator',
      short_name: 'political-translator',
      description: 'To translate political language for people\'s language',
      background_color: '#0291a7',
      icons: [
        {
          src: path.resolve('./src/medias/political-avatar.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    })
  ]
};
