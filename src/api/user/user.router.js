const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const controller = require('./auth.js')

router.post('/register', validate(controller.registerSchema), controller.register)

// your routes here

module.exports = router
