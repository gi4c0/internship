const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const { userMiddleware } = require('../middlewares/userMiddleware.js')
// const controller = require('./validationSchemas.js')
const jobs = require('./jobs')

router.get('/categories', jobs.getCategories)
router.get('/naics', jobs.getNaics)

module.exports = router
