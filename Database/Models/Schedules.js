const mongoose = require('mongoose')

const limitedAppsSchema = mongoose.Schema({
    name: {type: String, required: true},
    weekdays: {type: Number, default: 1},
    weekend: {type: Number, default: 1.30}
})

const blockedAppsSchema = mongoose.Schema({
    name: {type: String, required: true}
})

const scheduleSchema = mongoose.Schema({
    days: [String],
    starts: {
        type: Date,
        required: [true, 'Start date required']
    },
    ends: {
        type: Date,
        required: [true, 'End date required']
    },
    blockedApps: [blockedAppsSchema],
    limitedApps: [limitedAppsSchema]
})

module.exports = mongoose.model('Schedules', scheduleSchema)