const { verifyUser } = require('../authenticate')
const { addSchedule, getAllSchedules, deleteSchedule } = require('../Controllers/schedules')

const router = require('express').Router()

router.post('/add', verifyUser, addSchedule)
router.get('/', verifyUser, getAllSchedules)
router.delete('/delete/:id', verifyUser, deleteSchedule)

module.exports = router