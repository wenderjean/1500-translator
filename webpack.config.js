const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const rupture = require('rupture');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new CopyWebpackPlugin([{
      from: './src/medias/',
      to: './medias'
    }]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
};
