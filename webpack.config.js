const path = require('path')
const config = {

  entry: {
    app: ['./public/js/application.js']
  },
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js'
  }

}

module.exports = config;
