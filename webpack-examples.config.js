'use strict';
var webpack = require('webpack');
var fs = require('fs');

// Builds example bundles
module.exports = {
    context: __dirname,
    entry: {
      commons: ["lodash"],
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
    },
    module: {
      loaders: [
        {test: /(\.jsx|\.es)$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'}
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        "commons", "commons.js"),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ],
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".es"],
      alias: {'react-grid-layout': __dirname + '/index-dev.js'}
    }
};

// Load all entry points
var files = fs.readdirSync(__dirname + '/test/examples').filter(function(element, index, array){
    return element.match(/^.+\.jsx$/);
});

for(var idx in files){
    var file = files[idx];
    var module_name = file.replace(/\.jsx$/,'');
    module.exports.entry[module_name] = './test/examples/' + file;
}
