const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const rupture = require('rupture');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

const copyFiles = [
  { from: './src/medias/', to: './medias' },
  { from: './src/favicon.ico', to: './' },
];
 
const config = {
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ 
      title: '1500 Translator',
      hash: true, 
      template: './src/index.pug'
    }), 
    new CopyWebpackPlugin(copyFiles)
  ]
};

const webapp = {
  name: '1500 Translator', 
  short_name: 'Translator',
  description: 'To translate political language for people\'s language',
  background_color: '#0291a7',
  theme_color: '#0291a7',
  icons: [
    {
      src: path.resolve('./src/medias/political-avatar.png'),
      sizes: [96, 128, 192, 256, 384, 512]
    }
  ]
};

if (PROD) {
  config.plugins.push(new OfflinePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({})); 
  config.plugins.push(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }));
  config.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'disabled'})); 
  config.plugins.push(new WebpackPwaManifest(webapp));
}  

if (DEV) {
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true
  }; 
}  

module.exports = (env) => {
  return config;
};
 