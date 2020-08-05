const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

// development because of typeorm mapping
const { NODE_ENV = 'development' } = process.env;
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  plugins: [new webpack.IgnorePlugin(/^pg-native$/)],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
};
