const morgan = require('morgan')
const bodyParser = require('body-parser')

const { errorHandler } = require('../api/middlewares/errorHandler.js')
const router = require('../api/index.js')

module.exports = app => {
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use('/api', router)
  app.use(errorHandler)
}
