const Schedules = require("../Database/Models/Schedules");
const asyncWrapper = require("../Errorhandlers/asyncWrapper");

const addBlockedApp = asyncWrapper(async(req, res)=>{
    const { appName } = req.body
    const {_id} = req.user
    const {id} = req.params
    const updatedDocument = await Schedules.findOneAndUpdate({_id, "schedules._id": id},
        {
            $push:{
                "schedules.$.blockedApps": {name: appName}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'Sorry no documet found'})
    }
    res.status(201).json({message: 'Successfull'})
})

const removeBlockedApp = asyncWrapper(async(req, res)=>{
    const {_id} = req.user
    const {id, appId} = req.params
    const updatedDocument = await Schedules.findOneAndUpdate({_id, "schedules._id": id},
        {
            $pull:{
                "schedules.$.blockedApps": {_id: appId}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'Sorry no documet found'})
    }
    res.status(201).json({message: 'Successfull'})
})

const getBlockedApps = asyncWrapper(async(req, res)=>{
    const {_id} = req.user
    const {id} = req.params
    const data = await Schedules.findOne({_id}).select('schedules')
    const result = data.schedules.find((item)=>item._id.toString() === id.toString())
    res.status(200).json({message: 'Successfull', result: result.blockedApps})
})

module.exports = {addBlockedApp, removeBlockedApp, getBlockedApps}