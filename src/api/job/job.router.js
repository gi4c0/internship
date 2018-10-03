const router = require('express').Router()

const { validate } = require('../middlewares/validator.js')
const { checkRole } = require('../middlewares/userMiddleware.js')
const schema = require('./validationSchemas.js')
const jobs = require('./jobs')

router.get('/categories', checkRole(), jobs.getCategories)
router.get('/naics', checkRole(), jobs.getNaics)
router.get('/', validate(schema.getJobSchema), checkRole(), jobs.getJobs)
router.get('/:jobid', checkRole(), jobs.getJobById)

router.post('/', validate(schema.addJobSchema), checkRole('recruiter'), jobs.addJob)
router.patch('/:jobid', validate(schema.changeJobSchema), checkRole('recruiter'), jobs.updateJob)
module.exports = router
