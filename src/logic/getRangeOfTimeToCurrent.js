export function getRangeOfTimeToCurrent(second) {
  const current = new Date();
  let rangeMiliSecond = current - second * 1000;
  let seconds = Math.round(rangeMiliSecond / 1000);
  if (seconds < 30) return 'vừa xong';
  if (seconds < 60) return seconds + ' giây';
  let minutes = Math.round(rangeMiliSecond / 1000 / 60);
  if (minutes < 60) return minutes + ' phút';
  let hours = Math.round(rangeMiliSecond / 1000 / 60 / 60);
  if (hours < 24) return hours + ' giờ';
  let days = Math.round(rangeMiliSecond / 1000 / 60 / 60 / 24);
  if (days < 7) return days + ' ngày';
  return Math.round(rangeMiliSecond / 1000 / 60 / 60 / 24 / 7) + ' tuần';
}
