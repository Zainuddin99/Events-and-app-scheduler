const { addLimitedApp, removeLimitedApp, getLimitedApps } = require('../Controllers/limitedApps')

const router = require('express').Router()

router.post('/:id', addLimitedApp)
router.delete('/:id/:appId', removeLimitedApp)
router.get('/:id', getLimitedApps)

module.exports = router