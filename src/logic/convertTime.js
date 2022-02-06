
export function convertTime(seconds){
    const date = new Date(seconds*1000);
    var days = ['CN','T2','T3','T4','T5','T6','T7'];
    return days[date.getDay()]+', '+date.toLocaleTimeString().slice(0,5)
}