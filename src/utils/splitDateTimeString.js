export default function SplitDateTimeString(data){
    let dateAndTime = data.split('T')
    let date = dateAndTime[0]
    let splitTime = dateAndTime[1].split(':')
    let hours = splitTime[0]
    let mins = splitTime[1]
    let secs = splitTime.length>2?splitTime[2]:""

    return {
        "date": date,
        "hours": hours,
        "minutes": mins,
        "seconds": secs
    }
}