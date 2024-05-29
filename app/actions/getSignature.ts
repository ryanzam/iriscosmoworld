import cryptoJS from "crypto-js"

export default function (message: string) {
    const secret = "8gBm/:&EnhH.1/q"

    const hash = cryptoJS.HmacSHA256(message, secret)
    
    const hashInBase64 = cryptoJS.enc.Base64.stringify(hash)

    return hashInBase64
}