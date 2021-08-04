const asyncWrapper = require("../Errorhandlers/asyncWrapper")
const Schedules = require('../Database/Models/Schedules')

const addSchedule = asyncWrapper(async(req, res) =>{
    const {days, startTime, endTime} = req.body
    const startTimeArray = startTime.split(':')
    const endTimeArray = endTime.split(':')
    const a = await Schedules.create({days, 
        starts: new Date(0,0,0, startTimeArray[0], startTimeArray[1], 0),
        ends: new Date(0, 0, 0, endTimeArray[0], endTimeArray[1], 0)})
    res.status(201).json({message: 'Schedule created'})
})

const getAllSchedules = asyncWrapper(async(req, res)=>{
    const data = await Schedules.find({}).select('_id days starts ends')
    res.status(200).json({message: 'Operation successfull', result: data})
})

const deleteSchedule = asyncWrapper(async(req, res)=>{
    await Schedules.deleteOne({_id: req.params.id})
    res.status(200).json({message: "Item deleted"})
})

module.exports = {addSchedule, getAllSchedules, deleteSchedule}