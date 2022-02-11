export function getRangeOfTimeToCurrent(second){
    const current = new Date()
    let rangeMiliSecond = current-second*1000
    let seconds = Math.round(rangeMiliSecond/1000)
    let minutes = Math.round(rangeMiliSecond/1000/60)
    let hours = Math.round(rangeMiliSecond/1000/60/60)
    if(seconds<30) return 'vừa xong'
    if(seconds<60) return seconds+' giây'
    if(minutes<60) return minutes+' phút'
    return hours+' giờ'
}