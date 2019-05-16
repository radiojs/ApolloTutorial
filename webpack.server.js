const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',
  entry: './server/index.js',
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
