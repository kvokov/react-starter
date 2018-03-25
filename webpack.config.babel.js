import webpack from 'webpack'
import path from 'path'
import DotenvPligin from 'dotenv-webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import NotifierPlugin from 'webpack-notifier'
import UglifyjsPlugin from 'uglifyjs-webpack-plugin'
import { NODE_ENV, WDS_PORT, APP_NAME } from './src/shared/config'

const IS_PROD = NODE_ENV === 'production'

const config = {
  entry: [
    './src/client',
    './src/assets/less/main.less',
  ],
  output: {
    filename: 'js/bundle.js',
    sourceMapFilename: 'js/bundle.map',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: IS_PROD ? '/' : `http://localhost:${WDS_PORT}/`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },
  plugins: [
    new DotenvPligin({ systemvars: true }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: 'true',
      },
    }),
    new NotifierPlugin({
      title: APP_NAME,
      excludeWarnings: true,
      contentImage: '.src/assets/img/favicon.png',
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle.css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: { extensions: ['.js'] },
  devtool: IS_PROD ? false : 'inline-source-map',
}

if (!IS_PROD) {
  config.entry.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${WDS_PORT}`,
  )
  config.devServer = {
    port: WDS_PORT,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: {
      colors: true,
    },
  }

  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  config.module.rules.push({
    test: /\.jsx?$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    exclude: /node_modules/,
  })
} else {
  config.plugins.push(new UglifyjsPlugin())
}

export default config
