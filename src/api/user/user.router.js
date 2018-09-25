const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const { userMiddleware } = require('../middlewares/userMiddleware.js')
const controller = require('./validationSchemas.js')
const auth = require('./auth')

router.get('/confirm-token', auth.confirm)
router.get('/profile', auth.getCurrentUser)

router.post('/register', validate(controller.registerSchema), auth.register)
router.post('/login', validate(controller.loginSchema), auth.login)
router.post('/forgot-password', validate(controller.askForgotPasswordSchema), auth.askForgotPassword)

router.patch('/change-password', userMiddleware, validate(controller.changePasswordSchema), auth.changePassword)
router.patch('/reset-password', validate(controller.resetPasswordSchema), auth.resetPassword)
router.patch('/profile', validate(controller.changeUserSchema), auth.changeCurrentUser)

module.exports = router
