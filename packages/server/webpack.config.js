const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;
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
