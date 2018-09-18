const Promise = require('bluebird')

const middleware = require('./middleware')
const database = require('./database')

module.exports = async app => {
  await Promise.each([
    database,
    middleware
  ], func => func(app))

  return app
}
