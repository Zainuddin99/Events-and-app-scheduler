import React from 'react'
import { stringToDate } from '../utils'

function Time({str}) {
    const {h, m, a} = stringToDate(str)
    
    return (
        <p className='schedule-clock'>{h} : {m} {a}</p>
    )
}

export default Time
