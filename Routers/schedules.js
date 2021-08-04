const { addSchedule, getAllSchedules, deleteSchedule } = require('../Controllers/schedules')

const router = require('express').Router()

router.post('/add', addSchedule)
router.get('/', getAllSchedules)
router.delete('/delete/:id', deleteSchedule)

module.exports = router