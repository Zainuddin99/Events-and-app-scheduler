const asyncWrapper = require("../Errorhandlers/asyncWrapper")
const Schedules = require('../Database/Models/Schedules')
const {createCustomErrorInstance} = require('../Errorhandlers/customErrorHandle')

const addSchedule = asyncWrapper(async(req, res) =>{ 
    const {_id} = req.user

    const {days, startTime, endTime} = req.body

    const startTimeArray = startTime.split(':')
    const endTimeArray = endTime.split(':')

    const addingData = {    days, 
        starts: new Date(0,0,0, startTimeArray[0], startTimeArray[1], 0),
        ends: new Date(0, 0, 0, endTimeArray[0], endTimeArray[1], 0)
    }

    const a = await Schedules.updateOne({_id},
        {
            $push: {
                schedules: addingData
            }
        })

    res.status(201).json({message: 'Schedule added'})
})

const getAllSchedules = asyncWrapper(async(req, res, next)=>{
    const {_id, fullName} = req.user
    const data = await Schedules.findOne({_id}).select('schedules')
    if(data){
        return res.status(200).json({message: 'Operation successfull', result: data, fullName})
    }
    next(createCustomErrorInstance('Anauthorised', 401))
})

const deleteSchedule = asyncWrapper(async(req, res)=>{
    const {_id} = req.user
    const {id} = req.params
    await Schedules.updateOne({_id},
        {
            $pull: {
                schedules: {_id: id}
            }
        })
    res.status(200).json({message: "Item deleted"})
})

module.exports = {addSchedule, getAllSchedules, deleteSchedule}