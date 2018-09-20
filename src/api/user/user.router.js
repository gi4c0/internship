const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const controller = require('./auth.js')

router.post('/register', validate(controller.registerSchema), controller.register)
router.post('/login', validate(controller.loginSchema), controller.login)
// your routes here

module.exports = router
