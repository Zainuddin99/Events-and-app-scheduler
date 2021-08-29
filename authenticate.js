//authenticate
const passport = require('passport')
const passportLocal = require('passport-local')
const localStrategy = passportLocal.Strategy
const Users = require('./Database/Models/Schedules')
const passportJwt = require('passport-jwt')
const extractJwt = passportJwt.ExtractJwt
const jwtStrategy = passportJwt.Strategy
require('dotenv').config()


passport.use(new localStrategy(Users.authenticate()))


passport.use(new jwtStrategy(
    //1st parameter
    {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

    //2nd parameter
, (jwt_payload, done)=>{

    if(jwt_payload){
        return done(null, jwt_payload)
    }
    done(null, false)

}))

module.exports.verifyUser = passport.authenticate('jwt', {session: false})