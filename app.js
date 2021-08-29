const express = require('express')
const connectDB = require('./Database/connect')
const defaultErrorHandler = require('./Errorhandlers/defaultErrorHandler')
const app = express()
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const passport = require('passport')
require('./authenticate')

//Midllewares
app.use(cors())
app.use(express.json())

//Initializing passport
app.use(passport.initialize())

//Routers
const users = require('./Routers/users')
const schedules = require('./Routers/schedules')
const blockedApps = require('./Routers/blockedApps')
const limitedApps = require('./Routers/limitedApps')
const { createCustomErrorInstance } = require('./Errorhandlers/customErrorHandle')

//Router handlers
app.use('/users', users)
app.use('/schedules', schedules)
app.use('/apps/blocked-apps', blockedApps)
app.use('/apps/limited-apps', limitedApps) 

//Error handler
app.use(defaultErrorHandler)

//Post react build code when deploying
if(process.env.NODE_ENV === 'production'){
    //set static assets
    app.use(express.static('./client/build'))

    //Provides front end
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
    })
}

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