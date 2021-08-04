const Schedules = require("../Database/Models/Schedules");
const asyncWrapper = require("../Errorhandlers/asyncWrapper");

const addBlockedApp = asyncWrapper(async(req, res)=>{
    const { appName } = req.body
    const {id} = req.params
    const updatedDocument = await Schedules.findOneAndUpdate({_id: id},
        {
            $push:{
                blockedApps: {name: appName}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'Sorry no documet found'})
    }
    res.status(201).json({message: 'Successfull'})
})

const removeBlockedApp = asyncWrapper(async(req, res)=>{
    const {id, appId} = req.params
    console.log(id);
    const updatedDocument = await Schedules.findOneAndUpdate({_id: id},
        {
            $pull:{
                blockedApps: {_id: appId}
            }
        })
    if(!updatedDocument){
        return res.status(404).json({message: 'Sorry no documet found'})
    }
    res.status(201).json({message: 'Successfull'})
})

const getBlockedApps = asyncWrapper(async(req, res)=>{
    const {id} = req.params
    const data = await Schedules.findOne({_id: id}).select('blockedApps')
    res.status(200).json({message: 'Successfull', result: data})
})

module.exports = {addBlockedApp, removeBlockedApp, getBlockedApps}