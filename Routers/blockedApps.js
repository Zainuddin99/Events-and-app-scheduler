const { addBlockedApp, removeBlockedApp, getBlockedApps } = require('../Controllers/blockedApps')

const router = require('express').Router()

router.post('/:id', addBlockedApp)
router.delete('/:id/:appId', removeBlockedApp)
router.get('/:id', getBlockedApps)

module.exports = router