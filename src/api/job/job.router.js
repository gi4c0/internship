const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const { userMiddleware } = require('../middlewares/userMiddleware.js')
const controller = require('./validationSchemas.js')
const jobs = require('./jobs')

router.get('/categories', userMiddleware(), jobs.getCategories)
router.get('/naics', userMiddleware(), jobs.getNaics)
router.get('/', userMiddleware(), jobs.getJob)
router.get('/:jobid', userMiddleware(), jobs.getJobById)

router.post('/', validate(controller.addJobSchema), userMiddleware('recruiter'), jobs.addJob)
router.patch('/:jobid', validate(controller.changeJobSchema), userMiddleware('recruiter'), jobs.updateJob)
module.exports = router
