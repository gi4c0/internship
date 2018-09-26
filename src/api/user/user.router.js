const router = require('express').Router()
const config = require('config')
const storage = config.get('storage')

const { validate } = require('../middlewares/validator.js')
const { userMiddleware, userMiddlewareFile } = require('../middlewares/userMiddleware.js')
const controller = require('./validationSchemas.js')
const auth = require('./auth')

var multer = require('multer')

var upload = multer({ storage: storage(multer) })

router.get('/confirm-token', auth.confirm)
router.get('/profile', auth.getCurrentUser)

router.post('/register', validate(controller.registerSchema), auth.register)
router.post('/login', validate(controller.loginSchema), auth.login)
router.post('/forgot-password', validate(controller.askForgotPasswordSchema), auth.askForgotPassword)
router.post('/upload', userMiddlewareFile, upload.single('avatar'), auth.imgUpload)

router.patch('/change-password', userMiddleware, validate(controller.changePasswordSchema), auth.changePassword)
router.patch('/reset-password', validate(controller.resetPasswordSchema), auth.resetPassword)
router.patch('/profile', validate(controller.changeUserSchema), auth.changeCurrentUser)

module.exports = router
