const router = require('express').Router()

router.use('/users', require('./user/user.router.js'))
router.use('/jobs', require('./job/job.router.js'))
module.exports = router
