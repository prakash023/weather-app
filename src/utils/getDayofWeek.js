const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let date = new Date()
export default function GetDayofWeek(){
    return weekday[date.getDay()]
}