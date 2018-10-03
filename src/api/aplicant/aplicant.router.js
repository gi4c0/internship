const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const { checkRole } = require('../middlewares/userMiddleware.js')
const schema = require('./validationSchemas.js')
const aplicants = require('./aplicants')


module.exports = router
