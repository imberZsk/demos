import JSEncrypt from '../lib/jsencrypt'

const publicKey = `
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzT8NbWTD3vDouA3rMiZb
    fQupFnY8cjkbA5Mi2d3LXayPRD6HTr9vmh+FuqabJfeI/zAFhIP2H57KA8EFw+xd
    LD9bgqWB2GoWBEk/6J18/A79XaKk0UiLm1Tc/NAmD5JoW5PhuI0+B2cx/dAquC9l
    IMwLmel8Vg0zDXAOgrhAfqJlWhAWnuAoYXKxtQVBW+TzOfhnsjG9tofwOJdG97Yq
    Y8zZHNPLGd2v3fKgz4ZaI8cEEavJ8uS+r33mnOSWm8+WtaM+EvojU3b9ORUl3ytg
    128DvAZ87FqAuiMYpokM4439CMnedPV0Ud1kBbzY12oOxVDQJzfKCPMkcRk0hI+v
    SQIDAQAB
`

const encryptor = new JSEncrypt()
encryptor.setPublicKey(publicKey)

const rsa = {
    encryptData(data: string): string {
        return encryptor.encrypt(data) || ''
    },
    // decryptData(data: string): string {
    //     // setPrivateKey
    //     return encryptor.decrypt(data)
    // },
}

export default rsa