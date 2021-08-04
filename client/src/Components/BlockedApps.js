import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import {Alert, Button} from 'react-bootstrap'
import { addBlockedApp, removeBlockedApp } from '../api'
import {MdRemoveCircle} from 'react-icons/md'
import Loader from './Loader'

function BlockedApps() {
    const {getBlockedAppsFromApi, blockedApps, fetchingState} = useGlobalContext()
    const {id} = useParams()
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
        getBlockedAppsFromApi(id)
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(inputValue){
            setInputValue('')
            addBlockedAppToApi(id, inputValue)
        }
    } 

    const addBlockedAppToApi = async(id, data) =>{
        try{
            await addBlockedApp(id, data)
            getBlockedAppsFromApi(id)
        }catch(err){
            console.log(err);
        }
    }

    const deleteBlockedAppFromApi = async(appId) =>{
        try{
            await removeBlockedApp(id, appId)
            getBlockedAppsFromApi(id)
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='blocked-apps-page'>
        <h1 className="page-heading">Blocked Apps ( {blockedApps.length} )</h1>
        <hr />
        {fetchingState.loading ? <Loader/> : <>
        {blockedApps.length === 0 && <Alert className='no-schedule' variant='info'>
            No app found
            </Alert>}
        <div className='blocked-apps'>
            {
                blockedApps.map((item)=>{
                    const {_id, name, checked} = item
                    return (
                        <Alert key={_id} variant='secondary' className='li'>
                        {name}
                        <MdRemoveCircle onClick={()=>deleteBlockedAppFromApi(_id)}/>
                        </Alert>
                    )
                })
            }
        </div>
        </>
}
        <form className='add-apps' onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter the name of apps to be added' onChange={(e)=>setInputValue(e.target.value)}/>
            <Button type="submit" value={inputValue} variant='primary'>ADD</Button>
        </form>
        </div>
    )
}

export default BlockedApps
