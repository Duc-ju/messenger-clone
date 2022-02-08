
export function getUserName(user){
    if(!user||!user.displayName) return ''
    const nameArray = user.displayName.split(' ')
    return nameArray[nameArray.length-1]
}