var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var entryPath = "./entries";
var entries = {};
var files = fs.readdirSync(entryPath);
files.forEach(function(file){
  if(file.indexOf('.') == 0)return;//ignore hidden file
  var fileName = file.replace('.jsx','').replace('.js','');
  entries[fileName] = [entryPath+'/'+file, 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server']
});

module.exports = {
  entry: entries,

  output: {
    filename: "[name].js",
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: 'http://localhost:3000/static/'
    // necessary for HMR to know where to load the hot update chunks
  },

  externals: {
    "react"       : "React",
    "react-dom"   : "ReactDOM",
    "prop-types"  : "PropTypes",
    "redux"       : "Redux",
    "react-redux" : "ReactRedux"
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    // enable HMR on the server
  }
};
