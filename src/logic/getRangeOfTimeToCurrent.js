export function getRangeOfTimeToCurrent(second){
    const current = new Date()
    let rangeMiliSecond = current-second*1000
    let minute = Math.round(rangeMiliSecond/1000/60)
    if(minute<60) return minute+' phút'
    return Math.round(rangeMiliSecond/1000/60/60)+' giờ'
}