import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useGlobalContext } from '../context'
import {Alert, Button, Tab, Tabs} from 'react-bootstrap'
import { timeFormatter } from '../utils'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import LimitedAppsContainer from './LimitedAppsContainer'
import { removeLimitedApp } from '../api'
import Loader from './Loader'


function LimitedApps() {
    const {id} = useParams()
    const {getAllLimitedAppsFromApi, limitedApps, addLimitedAppToApi, fetchingState} = useGlobalContext()
    const [isModalOpen, setisModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [weekend, setWeekend] = useState(1.5)
    const [weekdays, setWeekdays] = useState(1)

    const openModal = (e) =>{
        e.preventDefault()
        if(inputValue){
            setisModalOpen(true)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        setInputValue('')
        addLimitedAppToApi(id, {name: inputValue, weekend, weekdays})
    }

    useEffect(()=>{
        getAllLimitedAppsFromApi(id)
    }, [getAllLimitedAppsFromApi, id])

    useEffect(()=>{
        if(isModalOpen){
            setisModalOpen(false)
        }
    }, [limitedApps])

    const removeAppFromApi = async(appId) =>{
        try {
            await removeLimitedApp(id, appId)
            getAllLimitedAppsFromApi(id)
        } catch (error) {
            
        }
    }

    return (
        <div className='limited-apps-page'>
            <h1 className="page-heading">Limited apps ( {limitedApps.length} )</h1>
            <hr />
            {fetchingState.loading ? <Loader/> : <>
            {limitedApps.length === 0 && <Alert className='no-schedule' variant='info'>
            No app found
            </Alert>}
            
            {
                <LimitedAppsContainer items={limitedApps} removeAppFromApi={removeAppFromApi}/>
            }
            </>
}
            <div action="" className="add-apps-container">
                <form action="">
                <div className="add-apps">
                <input placeholder='Enter the apps to be limited' type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                <Button type='submit' onClick={openModal}>Set Limit</Button>
                </div>
                </form>
                { isModalOpen && 
                <div className="form-modal-overlay">
                <div className='form-modal'>
                <form className='modal-form' onSubmit={handleSubmit}>
                <h2 className="app-input">{inputValue}</h2>
                <AiOutlineCloseCircle className='modal-close' onClick={()=>setisModalOpen(false)}/>
                <Tabs defaultActiveKey="weekdays">
                    <Tab eventKey="weekdays" title="Weekdays">
                        <div className="info">
                            <h5>Daily limit (Mon - Fri)</h5>
                            <h4>{timeFormatter(weekdays)}</h4>
                        </div>
                        <input type='range' min='0' max='6' step='0.5' value={weekdays} onChange={(e)=>setWeekdays(e.target.value)}/>
                    </Tab>
                    <Tab eventKey="weekend" title="Weekend">
                        <div className="info">
                            <h5>Daily limit (Sat - Sun)</h5>
                            <h4>{timeFormatter(weekend)}</h4>
                        </div>
                        <input type='range' min='0' max='6' step='0.5' value={weekend} onChange={(e)=>setWeekend(e.target.value)}/>
                    </Tab>
                </Tabs>
                <Button type='submit'>Submit</Button>
                </form>
                </div>
                </div> }
            </div>
        </div>
    )
}

export default LimitedApps
