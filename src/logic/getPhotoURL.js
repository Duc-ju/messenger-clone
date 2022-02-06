
export function getPhotoURL(user){
    if(!user||!user.photoURL) return "https://oxfraud.com/sites/default/files/default_images/null-image.jpg"
    return user.photoURL;
}