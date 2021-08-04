import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, useParams, useHistory, NavLink } from 'react-router-dom'
import BlockedApps from './BlockedApps'
import LimitedApps from './LimitedApps'

function Apps() {
    const {id} = useParams()
    const history = useHistory()

    return (
        <></>
    )
}

export default Apps
