const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/status-msg.js`,
    `./js/card.js`,
    `./js/pin.js`,
    `./js/validation.js`,
    `./js/form.js`,
    `./js/main.js`,
    `./js/filter.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
  devServer: {
    open: true,
    compress: true,
    port: 8080
  }
};
