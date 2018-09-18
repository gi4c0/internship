const app = require('express')()
const config = require('config')
const start = require('./src/startup/index.js')

const port = config.get('port')

start(app)
  .then(app => {
    app.listen(port, console.log(`Server is listening on port ${port}`))
  })
