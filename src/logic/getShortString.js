
export function getShortString(str, maxLength){
    if(str.length<maxLength) return str
    else return str.substring(0, maxLength)+'...'
}