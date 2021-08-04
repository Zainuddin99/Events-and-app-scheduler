import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { addBlockedApp, addLimitedApp, deleteSchedule, getAllSchedules, getBlockedApps, getLimitedApps, sendSchedules } from './api'
import { reducer } from './reducer'

const myContext = createContext()

const initialWeeks = {Mo : false, Tu : false, We : false, Th : false, Fr : false, Sa : false, Su : false }

const AppProvider = ({children}) =>{
    const [weeks, setWeeks] = useState(initialWeeks)
    const [fetchingState, dispatch] = useReducer(reducer, {loading: false, message: ''})
    const [allSchedules, setAllScedules] = useState([])
    const [blockedApps, setBlockedApss] = useState([])
    const [limitedApps, setLimitedApps] = useState([])
    const [saveError, setSaveError] = useState('')

    useEffect(()=>{
        getSchedulesFromApi()
    }, [])

    const handleSave = async(start, end) =>{
        if(start >= end){
            return setSaveError('Invalid time')
        }
        if(saveError){
            setSaveError('')
        }
        let days = Object.entries(weeks).map(([key, value])=>{
            if(value){
                return key
            }
        })
        days = days.filter((item)=>item)
        dispatch({type: 'LOADING'})
        try{
        const data = await sendSchedules({days, startTime: start, endTime: end})
        dispatch({type:'SUCCESS', payload: data})
        setWeeks(initialWeeks)
        window.history.back()
        getSchedulesFromApi()
        }catch(err){
            dispatch({type: 'FAILED', payload: err})
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>dispatch({type: 'CLEAR'}), 3000)

        return ()=>clearTimeout(timer)
    }, [fetchingState.message])

    const getSchedulesFromApi = async() =>{
        dispatch({type: 'LOADING'})
        try {
            const response = await getAllSchedules()
            setAllScedules(response.data.result)
            dispatch({type:'SUCCESS', payload: response})
        } catch (error) {
            dispatch({type: 'FAILED', payload: error})
        }
    }

    const deleteScheduleFromApi = async(id) =>{
        try{
            await deleteSchedule(id)
            getSchedulesFromApi()
        }catch(err){
            console.log(err)
        }
    }

    const getBlockedAppsFromApi = async(id) =>{
        try{
        dispatch({type: 'LOADING'})
        const response = await getBlockedApps(id)
        const modifiedArray = response.data.result.blockedApps.map((item)=>{
            return {...item, checked: true}
        })
        setBlockedApss(modifiedArray)
        dispatch({type: 'STOP LOADING'})
    }catch(err){
        dispatch({type: 'STOP LOADING'})
        console.log(err);
    }
    }

    const getAllLimitedAppsFromApi = async(id) =>{
        dispatch({type: 'LOADING'})
        try {
            const response = await getLimitedApps(id)
            setLimitedApps(response.data.result.limitedApps)
            dispatch({type: 'STOP LOADING'})
        } catch (error) {
            dispatch({type: 'STOP LOADING'})
            console.log(error)
        }
    }

    const addLimitedAppToApi = async(id, data) =>{
        try{
            await addLimitedApp(id, data)
            getAllLimitedAppsFromApi(id)
        }catch(err){
            console.log(err);
        }
    }


    const handleWeeks = (week) =>{
        setWeeks((prev)=>{
            return {
                ...prev,
                [week]: !(prev?.[week])
            }
        })
    }
    return (<myContext.Provider value={{weeks, setWeeks, handleWeeks, handleSave, fetchingState, allSchedules, deleteScheduleFromApi, 
    blockedApps, limitedApps, getSchedulesFromApi, getBlockedAppsFromApi, getAllLimitedAppsFromApi, addLimitedAppToApi, dispatch, saveError}}>
        {children}
    </myContext.Provider>)
}

const useGlobalContext = () =>{
    return useContext(myContext)
}

export {useGlobalContext, AppProvider}