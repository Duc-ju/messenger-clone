
export function convertTime(seconds){
    const date = new Date(seconds*1000);
    const now = new Date()
    var days = ['CN','T2','T3','T4','T5','T6','T7'];
    if(date.getDay()===now.getDay()&&now.getTime()-date.getTime()<86400000) return date.toLocaleTimeString().slice(0,5)
    if((now.getDay()===0||(date.getDay()<=now.getDay()))&&now.getTime()-date.getTime()<604800000) return days[date.getDay()]+', '+date.toLocaleTimeString().slice(0,5)
    return date.toLocaleTimeString().slice(0,5)+', '+date.getDate()+' Tháng '+(date.getMonth()+1)+', '+date.getFullYear()
}