import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useGlobalContext } from '../context'
import Time from './Time'
import Weeks from './Weeks'
import {FaTrash} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Schedules() {
    const {allSchedules, deleteScheduleFromApi} = useGlobalContext()

    if(allSchedules.length === 0){
        return <Alert className='no-schedule' variant='info'>
            No schedules
            </Alert>
    }

    return (
        <div className='all-schedules'>
            {
                allSchedules.map((item)=>{
                    const {starts, ends, days, _id} = item

                    return (
                        <div className="schedule" key={_id}>
                            <FaTrash className='btn-schedule-delete' onClick={()=>deleteScheduleFromApi(_id)}/>
                            <h4>Work time</h4>
                            <hr />
                            <Weeks days={days}/>
                            <div className="schedule-times">
                            <div className="schedule-time">
                                <h4>Starts:</h4>
                                <Time str={starts}/>
                            </div>
                            <div className="schedule-time">
                                <h4>Ends:</h4>
                                <Time str={ends}/>
                            </div>
                            </div>
                            <div className='link-container'>
                            <Link to={`/apps/${_id}/blocked-apps`}><Button variant='dark'>Blocked Apps</Button></Link>
                            <Link to={`/apps/${_id}/limited-apps`}><Button variant='dark'>Limited Apps</Button></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Schedules
