const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const controller = require('../middlewares/contrValid.js')
const auth = require('./auth')
router.post('/register', validate(controller.registerSchema), auth.register)
router.post('/login', validate(controller.loginSchema), auth.login)
// your routes here
router.get('/confirm-token', auth.confirm)
router.patch('/change-password', validate(controller.changePasswordSchema), auth.changePassword)
router.patch('/reset-password', validate(controller.resetPasswordSchema), auth.resetPassword)
router.post('/forgot-password', validate(controller.askForgotPasswordSchema), auth.askForgotPassword)
module.exports = router
