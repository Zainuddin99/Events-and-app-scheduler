import React from 'react'
import { Alert } from 'react-bootstrap'
import { MdRemoveCircle } from 'react-icons/md'
import { timeFormatter } from '../utils'

function LimitedAppsContainer({items, removeAppFromApi}) {

    return (
        <div className='limited-apps-container'>
            {
                items.map((item)=>{
                    const {_id, name, weekdays, weekend} = item
                    return (
                        <Alert key={_id} variant='secondary' className='li'>
                        <p>{name} <MdRemoveCircle style={{color:"red"}} onClick={()=>removeAppFromApi(_id)}/></p>
                        <div className='time-container'>
                            <p>Weekdays: <span>{timeFormatter(weekdays)}</span> </p>
                            <p>Weekend: <span>{timeFormatter(weekend)}</span></p>
                        </div>
                        </Alert>
                    )
                })
            }
        </div>
    )
}

export default LimitedAppsContainer
