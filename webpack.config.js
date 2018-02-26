const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DEBUG = process.env.NODE_ENV !== 'production'
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]',
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.pug/,
        use: [{ loader: 'html-loader' }, { loader: 'pug-html-loader' }],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(`styles${DEBUG ? '' : '.[contenthash]'}.css`),
    new CopyWebpackPlugin([{ from: './src/images', to: 'images' }]),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
  ],
}
