const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 引入css 单独打包插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Create multiple instances
const extractCSS = new ExtractTextPlugin('css/[name]_bundle.css');
const extractLESS = new ExtractTextPlugin('css/[name]_bundle.css');
//
module.exports = {
  mode:'development',
  entry:{
      wap: __dirname + '/static/js/main.js',
      index: __dirname + '/static/js/index.js',
      usercenter: __dirname + '/static/js/usercenter.js',
  },
  output:{
   path: path.resolve(__dirname,'static/dist'),
   filename: 'js/[name]_bundle.js',
  },
  plugins: [
      extractCSS,
      extractLESS,
      // new CleanWebpackPlugin(),
      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.style\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
      })
  ],
    //压缩css
    optimization: {
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsPlugin({})
        ],
    },
    module: {
    rules: [
      {
          test:/\.css$/,
          include: path.resolve(__dirname, 'static'),// 匹配时查找的范围
          use: extractCSS.extract({
              fallback: 'style-loader',
              publicPath: '../',
              use: [
                  'css-loader',
                  'postcss-loader'
              ]
          })
      },
      {
          test: /\.less$/i,
          include: path.resolve(__dirname, 'static'),             // 匹配时查找的范围
          use:extractLESS.extract({
              fallback: 'style-loader',
              publicPath: '../',
              use: [
                  'css-loader',
                  'postcss-loader',
                  'less-loader'
              ]
          })
      },
      {
        test: /\.js$/,               // 匹配js文件
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),    //匹配时忽略这个目录，提高打包速度
        include: path.resolve(__dirname, 'static'),             // 匹配时查找的范围
          options: {
              presets: ['@babel/preset-env']
          }
      },
        {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            loader: 'url-loader?limit=1000&name=images/[name].[ext]',

          include: path.resolve(__dirname, 'static')            // 匹配时查找的范围
        },
        {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            loader: 'image-webpack-loader',// 压缩图片

          include: path.resolve(__dirname, 'static'),             // 匹配时查找的范围
            options: {
                limit: 10000,
                name: 'images/[name].[ext]'
            }
        }
    ]
  }
};
