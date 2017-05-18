var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var fs = require('fs');

//create entries
var entries = {};
var files = fs.readdirSync('./entry');
files.forEach(function(file){
  if(file.indexOf('.')==0)return;//ignore hidden file
  var fileName = file.replace('.jsx','').replace('.js','');
  entries[fileName] = ['../entry/'+file]
});

module.exports = {
  entry: entries,

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '../../js/dist'),
    publicPath: '/'
  },

  externals: config.externals,
  module: config.module,
  resolve: config.resolve,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
};
