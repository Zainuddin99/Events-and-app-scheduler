const jwt = require('jsonwebtoken')
const Users = require('../Database/Models/Schedules')
const asyncWrapper = require('../Errorhandlers/asyncWrapper')
require('dotenv').config()

const addUser = asyncWrapper(async(req, res) =>{

    const {username, password, firstName, lastName} = req.body

    const userDocument = await Users.register(new Users({username, firstName, lastName}), password)

    res.status(201).json({message: "User successfully added", userDetails: userDocument})

})

const getAllUsers = asyncWrapper(async(req, res) =>{

    const result = await Users.find({})
    res.status(200).json({message: 'Successfull', result_length: result.length, result})

})

const loginUser = asyncWrapper((req, res)=>{

    const { _id, firstName, lastName } = req.user
    const token = jwt.sign({_id, fullName: `${firstName} ${lastName}`}, process.env.SECRET_KEY)
    res.status(200).json({message: 'You are successfully logged in', token, fullName: `${firstName} ${lastName}`})

})

module.exports = {addUser, getAllUsers, loginUser}