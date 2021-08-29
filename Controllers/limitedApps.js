const Schedules = require("../Database/Models/Schedules")
const asyncWrapper = require('../Errorhandlers/asyncWrapper')


const addLimitedApp = asyncWrapper(async(req, res)=>{
    const {name, weekdays, weekend} = req.body
    const {id} = req.params
    const {_id} = req.user
    const document = await Schedules.findOneAndUpdate({_id , "schedules._id": id},
        {
            $push: {
                "schedules.$.limitedApps": {name, weekdays, weekend}
            }
        })
    if(!document){
        return res.status(404).json({message: 'No document found'})
    }
    res.status(200).json({message: 'Added successfully'})
})

const removeLimitedApp = asyncWrapper(async(req, res)=>{
    const {id, appId} = req.params
    const {_id} = req.user
    const updatedDocument = await Schedules.findOneAndUpdate({_id, "schedules._id": id},
        {
            $pull:{
                "schedules.$.limitedApps": {_id: appId}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'No document found'})
    }
    res.status(200).json({message: 'Successfully deleted'})
})

const getLimitedApps = asyncWrapper(async(req, res)=>{
    const {id} = req.params
    const {_id} = req.user
    const documents = await Schedules.findOne({_id}).select('schedules')
    const result = documents.schedules.find(item=>item._id.toString() === id.toString())
    res.status(200).json({message: 'Operation successfull', result: result.limitedApps})
})

module.exports = {addLimitedApp, removeLimitedApp, getLimitedApps}