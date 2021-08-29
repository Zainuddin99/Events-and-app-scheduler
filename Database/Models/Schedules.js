const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

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

const userSchema = mongoose.Schema({
    schedules: [scheduleSchema],
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Users', userSchema)