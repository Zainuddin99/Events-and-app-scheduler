import React, { useState } from 'react'
import Weeks from './Weeks'
import TimePicker from 'react-time-picker';
import { Alert, Button } from 'react-bootstrap';
import { useGlobalContext } from '../context';

function AddSchedules() {
    const {handleSave, fetchingState, saveError} = useGlobalContext()

    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('00:00')

    return (
        <div className='schedules-add'>
            <h1>Add work time</h1>
            <hr />
            <div className='schedules-add-form'>
                <h2>Days active</h2>
                <Weeks/>
                <div className='times'>
                    <div className="time">
                        <h4>From:</h4>
                        <TimePicker onChange={(e)=>setStartTime(e)} value={startTime}/>
                    </div>
                    <div className="time">
                        <h4>To:</h4>
                        <TimePicker onChange={(e)=>setEndTime(e)} value={endTime}/>
                    </div>
                </div>
                {saveError && <Alert variant='warning' className='save-error'>Invalid time</Alert>}
                <Button variant='primary' className='btn-save' disabled={fetchingState.loading || false} onClick={()=>handleSave(startTime, endTime)}>{fetchingState.loading ? 'Loading' : 'Save'}</Button>
            </div>
        </div>
    )
}

export default AddSchedules
