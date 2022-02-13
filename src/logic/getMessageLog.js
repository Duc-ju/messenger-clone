const log = {
    log1: 'đã tạo nhóm.',
    log2: 'đã đặt tên nhóm là ',
    log3: 'đã xoá tên nhóm.',
    log4: 'đã thay đổi ảnh nhóm.',
    log5: ''
}
export function getMessageLog(message, user){
    const header = message.uid===user.uid? 'Bạn ': message.displayName+' '
    if(message.type === 'log2'||message.type === 'log5') return header + log['log2'] + message.data;
    return header+log[message.type]
}