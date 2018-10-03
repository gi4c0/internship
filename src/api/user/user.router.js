const router = require('express').Router()
const { storage, filterImage } = require('../../utils/mutlerSettings')

const { validate } = require('../middlewares/validator.js')
const { checkRole } = require('../middlewares/userMiddleware.js')
const schema = require('./validationSchemas.js')
const auth = require('./auth')

const multer = require('multer')
const upload = multer({ storage: storage(multer), fileFilter: filterImage })

router.get('/confirm-token', auth.confirm)
router.get('/profile', checkRole, auth.getCurrentUser) // ---------------------

router.post('/register', validate(schema.registerSchema), auth.register)
router.post('/login', validate(schema.loginSchema), auth.login)
router.post('/forgot-password', validate(schema.askForgotPasswordSchema), auth.askForgotPassword)
router.post('/upload', checkRole, upload.single('avatar'), validate(schema.imageSchema), auth.imgUpload) // -------------------

router.patch('/change-password', checkRole, validate(schema.changePasswordSchema), auth.changePassword) // ---------------------------
router.patch('/reset-password', validate(schema.resetPasswordSchema), auth.resetPassword)
router.patch('/profile', checkRole, validate(schema.changeUserSchema), auth.updateProfile) // ---------------------------------------

module.exports = router
