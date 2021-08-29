const { verifyUser } = require('../authenticate')
const { addBlockedApp, removeBlockedApp, getBlockedApps } = require('../Controllers/blockedApps')

const router = require('express').Router()

router.post('/:id', verifyUser, addBlockedApp)
router.delete('/:id/:appId', verifyUser, removeBlockedApp)
router.get('/:id', verifyUser, getBlockedApps)

module.exports = router