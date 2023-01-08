const path = require('path');

module.exports = {
  entry: {
  src :'./src/src.js',
  login: './src/login.js',
  register: './src/register.js',
  showinfo: './src/Showinfo.js',
  myaccount: './src/myaccount.js',
  shows: './src/Shows.js',
  mylist: './src/mylist.js'
}
  ,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs/js'),
  },
  mode: 'production',
  watch: true
};
