const passport = require('passport')
const { verifyUser } = require('../authenticate')
const { getAllUsers, addUser, loginUser } = require('../Controllers/users')

const router = require('express').Router()

router.route('/').get(verifyUser, getAllUsers).post(addUser)

router.route('/login').post(passport.authenticate('local', {session: false}), loginUser)

module.exports = router