import axios from 'axios'

const API = axios.create({baseURL: '/'})

export const sendSchedules = (data) => API.post('/schedules/add', data)

export const getAllSchedules = () => API.get('/schedules')

export const deleteSchedule = (id) => API.delete('/schedules/delete/'+id)

export const getBlockedApps = (id) => API.get(`/apps/blocked-apps/${id}`)

export const addBlockedApp = (id, data) => API.post(`/apps/blocked-apps/${id}`, {appName: data})

export const removeBlockedApp = (id, appId) => API.delete(`/apps/blocked-apps/${id}/${appId}`)

export const getLimitedApps = (id) => API.get(`/apps/limited-apps/${id}`)

export const addLimitedApp = (id, data) => API.post(`/apps/limited-apps/${id}`, data)

export const removeLimitedApp = (id, appId) => API.delete(`/apps/limited-apps/${id}/${appId}`)