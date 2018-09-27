const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../../config/db-config.json')[env]

const { userFactory } = require('./user.js')
const { jobFactory } = require('./job.js')
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Job: jobFactory(sequelize)
}

module.exports = db
