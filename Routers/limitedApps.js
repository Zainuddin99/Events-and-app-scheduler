const { verifyUser } = require('../authenticate')
const { addLimitedApp, removeLimitedApp, getLimitedApps } = require('../Controllers/limitedApps')

const router = require('express').Router()

router.post('/:id', verifyUser, addLimitedApp)
router.delete('/:id/:appId', verifyUser, removeLimitedApp)
router.get('/:id', verifyUser, getLimitedApps)

module.exports = router