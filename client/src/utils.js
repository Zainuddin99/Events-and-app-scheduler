export const stringToDate = (str) =>{
        const date = new Date(str)
        const hour = date.getHours()
        const h = formatTime(hour > 12 ? hour - 12 : hour)
        const m = formatTime(date.getMinutes())
        const a = formatTime(hour > 12 ? 'PM' : 'AM')
        return {h, m, a}
    }

const formatTime = (t) =>{
    if(t <= 9){
        return `0${t}`
    }
    return t
}

export const timeFormatter = (num) =>{
    const time = (num+'').split('.')
    let timeStr = time[0]+'h'
    if(time[1]){
        timeStr += ` 30m`
    }
    return timeStr
}