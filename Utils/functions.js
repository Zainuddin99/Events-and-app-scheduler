module.exports.meridienToTime = (meridian, hour) =>{
    if(meridian === "AM"){
        return hour
    }
    return hour+12
}