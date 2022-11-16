const path = require('path');

module.exports = {
  entry: './src/src.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};
