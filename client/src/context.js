import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { addLimitedApp, deleteSchedule, getAllSchedules, getBlockedApps, getLimitedApps, loginUser, sendSchedules, signUpUser } from './api'
import { reducer } from './reducer'
import { utilsStateReducer } from './UtilsStateReducer'

const myContext = createContext()

const initialWeeks = { Mo: false, Tu: false, We: false, Th: false, Fr: false, Sa: false, Su: false }

const initialUtilsState = { loginPageOpen: false, loginPageState: true, fullName: '' }

const AppProvider = ({ children }) => {
    const [weeks, setWeeks] = useState(initialWeeks)
    const [fetchingState, dispatch] = useReducer(reducer, { loading: false, message: '' })
    const [allSchedules, setAllScedules] = useState([])
    const [blockedApps, setBlockedApss] = useState([])
    const [limitedApps, setLimitedApps] = useState([])
    const [saveError, setSaveError] = useState('')
    const [utilsState, utilsStateDispatch] = useReducer(utilsStateReducer, initialUtilsState)
    const [inputs, setInput] = useState({ firstName: '', lastName: '', userName: '', password: '' })
    const [formError, setFormError] = useState(null)
    const [formSuccessMessage, setFormSuccessMessage] = useState('')

    const getSchedulesFromApi = useCallback(async () => {
        dispatch({ type: 'LOADING' })
        try {
            const response = await getAllSchedules()
            setAllScedules(response.data.result.schedules)
            dispatch({ type: 'SUCCESS', payload: response })
            utilsStateDispatch({ type: 'UPDATE_NAME', payload: response.data.fullName })
        } catch (error) {
            handleError(error)
        }
    }, [])

    useEffect(() => {
        getSchedulesFromApi()
    }, [getSchedulesFromApi])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (formError) setFormError('')
            if (formSuccessMessage) setFormSuccessMessage('')
        }, 3000)

        return () => clearTimeout(timer)

    }, [formError, formSuccessMessage])

    const handleSave = async (start, end) => {
        if (start >= end) {
            return setSaveError('Invalid time')
        }
        if (saveError) {
            setSaveError('')
        }
        let days = Object.entries(weeks).map(([key, value]) => {
            if (value) {
                return key
            }
            return null
        })
        days = days.filter((item) => item)
        dispatch({ type: 'LOADING' })
        try {
            const data = await sendSchedules({ days, startTime: start, endTime: end })
            dispatch({ type: 'SUCCESS', payload: data })
            setWeeks(initialWeeks)
            window.history.back()
            getSchedulesFromApi()
        } catch (err) {
            dispatch({ type: 'FAILED', payload: err })
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)

        return () => clearTimeout(timer)
    }, [fetchingState.message])

    const handleError = (err) => {
        if (err.response?.status === 401) {
            utilsStateDispatch({ type: 'NOT_AUTHORIZED' })
            return dispatch({ type: 'STOP LOADING' })
        }
        dispatch({ type: 'FAILED' })
    }

    const deleteScheduleFromApi = async (id) => {
        try {
            await deleteSchedule(id)
            getSchedulesFromApi()
        } catch (err) {
            console.log(err)
        }
    }

    const getBlockedAppsFromApi = async (id) => {
        try {
            dispatch({ type: 'LOADING' })
            const response = await getBlockedApps(id)
            setBlockedApss(response.data.result)
            dispatch({ type: 'STOP LOADING' })
        } catch (err) {
            dispatch({ type: 'STOP LOADING' })
            console.log(err);
        }
    }

    const getAllLimitedAppsFromApi = useCallback(async (id) => {
        dispatch({ type: 'LOADING' })
        try {
            const response = await getLimitedApps(id)
            setLimitedApps(response.data.result)
            dispatch({ type: 'STOP LOADING' })
        } catch (error) {
            dispatch({ type: 'STOP LOADING' })
            console.log(error)
        }
    }, [])

    const addLimitedAppToApi = async (id, data) => {
        try {
            await addLimitedApp(id, data)
            getAllLimitedAppsFromApi(id)
        } catch (err) {
            console.log(err);
        }
    }


    const handleWeeks = (week) => {
        setWeeks((prev) => {
            return {
                ...prev,
                [week]: !(prev?.[week])
            }
        })
    }

    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { firstName, lastName, password, userName: username } = inputs
        if (utilsState.loginPageState) {
            if (!username || !password) {
                setFormError('All fields are required!')
            } else {
                try {
                    const response = await loginUser({ username, password })
                    const { token } = response.data
                    localStorage.setItem('token', token)
                    utilsStateDispatch({ type: "CLOSE_LOGIN_PAGE" })
                    getSchedulesFromApi()
                } catch (err) {
                    if (err.response.status === 401) {
                        setFormError('Invalid credentials!')
                    } else {
                        setFormError('Something went wrong!')
                    }
                }
            }
            return
        }

        if (!firstName || !lastName || !password || !username) {
            return setFormError('All fields are required')
        }

        try {
            await signUpUser({ username, firstName, lastName, password })
            setFormSuccessMessage('Successfully Signed up')
        } catch (err) {
            setFormError(err.response.data.message)
        }

    }

    const logout = () => {
        if (window.confirm('Confirm to logout')) {
            localStorage.clear('token')
            window.location.reload()
        }
    }

    return (<myContext.Provider value={{
        weeks, setWeeks, handleWeeks, handleSave, fetchingState, allSchedules, deleteScheduleFromApi,
        blockedApps, limitedApps, getSchedulesFromApi, getBlockedAppsFromApi, getAllLimitedAppsFromApi, addLimitedAppToApi, dispatch, saveError,
        utilsState, utilsStateDispatch, inputs, handleChange, handleSubmit, formError, formSuccessMessage, logout
    }}>
        {children}
    </myContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(myContext)
}

export { useGlobalContext, AppProvider }