export function RandomString(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let randStr = "";

    for (let index = 0; index < 20; index++) {
        randStr += characters.charAt(Math.floor(Math.random() * characters.length));      
    }
    return randStr;
}