const Schedules = require("../Database/Models/Schedules")
const asyncWrapper = require('../Errorhandlers/asyncWrapper')


const addLimitedApp = asyncWrapper(async(req, res)=>{
    const {name, weekdays, weekend} = req.body
    const {id} = req.params
    const document = await Schedules.findOneAndUpdate({_id: id},
        {
            $push: {
                limitedApps: {name, weekdays, weekend}
            }
        })
    if(!document){
        return res.status(404).json({message: 'No document found'})
    }
    res.status(200).json({message: 'Added successfully'})
})

const removeLimitedApp = asyncWrapper(async(req, res)=>{
    const {id, appId} = req.params
    const updatedDocument = await Schedules.findOneAndUpdate({_id: id},
        {
            $pull:{
                limitedApps: {_id: appId}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'No document found'})
    }
    res.status(200).json({message: 'Successfully deleted'})
})

const getLimitedApps = asyncWrapper(async(req, res)=>{
    const {id} = req.params
    const documents = await Schedules.findOne({_id: id}).select('limitedApps')
    res.status(200).json({message: 'Operation successfull', result: documents})
})

module.exports = {addLimitedApp, removeLimitedApp, getLimitedApps}