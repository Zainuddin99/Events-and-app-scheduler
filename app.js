const express = require('express')
const connectDB = require('./Database/connect')
const defaultErrorHandler = require('./Errorhandlers/defaultErrorHandler')
const app = express()
require('dotenv').config()
const cors = require('cors')
const path = require('path')

//Midllewares
app.use(cors())
app.use(express.json())

//Routers
const schedules = require('./Routers/schedules')
const blockedApps = require('./Routers/blockedApps')
const limitedApps = require('./Routers/limitedApps')

//Router handlers
app.use('/schedules', schedules)
app.use('/apps/blocked-apps', blockedApps)
app.use('/apps/limited-apps', limitedApps)

//Error handler
app.use(defaultErrorHandler)



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.js'))
    })
}

//All request handlers
app.use('*', (req, res)=>{
    res.status(404).json({Message: 'No routes found'})
})

const PORT = process.env.PORT || 5000

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>console.log(`Server started on ${PORT}`))
    }catch(err){
        console.log(err);
    }
}

start()