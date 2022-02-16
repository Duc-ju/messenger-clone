const log = {
    log1: 'đã tạo nhóm.',
    log2: 'đã đặt tên nhóm là ',
    log3: 'đã xoá tên nhóm.',
    log4: 'đã thay đổi ảnh nhóm.',
    log5: 'đã thêm vào nhóm một số thành viên mới.'
}
export function getMessageLog(message, user){
    const header = message.uid===user.uid? 'Bạn ': message.displayName+' '
    if(message.type === 'log2') return header + log['log2'] + message.data +'.';
    return header+log[message.type]
}