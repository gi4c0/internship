const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const controller = require('./auth.js')

router.post('/register', validate(controller.registerSchema), controller.register)
router.post('/login', validate(controller.loginSchema), controller.login)
// your routes here
router.get('/confirm-token', controller.confirm)
router.post('/change-password', controller.changePassword)
router.post('/reset-password', controller.resetPassword)
router.post('/forgot-password', controller.askForgotPassword)
module.exports = router
