
export function getPhotoURL(user){
    if(!user||!user.photoURL) return process.env.PUBLIC_URL + '/img/null.jpg'
    return user.photoURL;
}