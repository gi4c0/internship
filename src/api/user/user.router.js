const router = require('express').Router()
const { storage } = require('../../utils/mutlerSettings')

const { validate } = require('../middlewares/validator.js')
const { userMiddleware, userMiddlewareGet } = require('../middlewares/userMiddleware.js')
const controller = require('./validationSchemas.js')
const auth = require('./auth')

const multer = require('multer')
const upload = multer({ storage: storage(multer) })

router.get('/confirm-token', auth.confirm)
router.get('/profile', userMiddlewareGet, auth.getCurrentUser)

router.post('/register', validate(controller.registerSchema), auth.register)
router.post('/login', validate(controller.loginSchema), auth.login)
router.post('/forgot-password', validate(controller.askForgotPasswordSchema), auth.askForgotPassword)
router.post('/upload', userMiddlewareGet, upload.single('avatar'), auth.imgUpload)

router.patch('/change-password', userMiddleware, validate(controller.changePasswordSchema), auth.changePassword)
router.patch('/reset-password', validate(controller.resetPasswordSchema), auth.resetPassword)
router.patch('/profile', userMiddleware, validate(controller.changeUserSchema), auth.updateProfile)

module.exports = router
