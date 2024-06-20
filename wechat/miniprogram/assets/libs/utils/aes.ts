import CryptoJS from '../lib/crypto-js'

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const aes = {

    getKey() {
        return generateRandomString()
    },

    encryptData(data: string, key: string): string {
        return CryptoJS.AES.encrypt(
            data,
            CryptoJS.enc.Utf8.parse(key),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        ).toString()
    },

    decryptData(data: string, key: string): string {
        return CryptoJS.AES.decrypt(
            {
                ciphertext: CryptoJS.enc.Base64.parse(data),
            },
            CryptoJS.enc.Utf8.parse(key),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        ).toString(CryptoJS.enc.Utf8)
    },
}

export default aes