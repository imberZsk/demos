
/***
 * @Description:  用户是否登录
 * @return: boolean
 **/
export function isUserLogin(): boolean {
    const _token = token();

    return !!_token;
}

/**
 * 获取用户登录手机号
 * 备注：调用这个方法之前，请确保用户已经授权登录成功
 */
export async function getMobile(): Promise<string> {
    try {
        const res =  await wx.getStorage({
            key: 'phone',
            encrypt: true,
        });
        return res?.data || wx.getStorageSync('authMobile');
    } catch (e) {
        return wx.getStorageSync('authMobile');
    }
}

// 用户是否授权微信
export function isAuthWechat(): boolean {
    return !!wx.getStorageSync("userInfo");
}


// 获取 token
export function token(): string | null {
    const fm_userInfo = wx.getStorageSync("fm_userInfo") || {};

    return fm_userInfo?.token?.accessToken || null;
}


