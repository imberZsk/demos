type ShowActionSheetSuccessCallbackResult = WechatMiniprogram.ShowActionSheetSuccessCallbackResult;

export function showModal(content: string) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false
    })
}

export function toast(value: string, duration: number = 1500, mask: boolean = true) {
    wx.showToast({
        title: value,
        icon: 'none',
        mask,
        duration
    })
}


/**
 * 把当画布指定区域的内容导出生成指定大小的图片。
 * @param obj 参数对象
 * @param that 在自定义组件下，当前组件实例的this
 * 注意：在 `draw()` 回调里调用该方法才能保证图片导出成功。
 */
export function canvasToTempFilePath(obj: object, that: any) {
    return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
            ...obj,
            success: resolve,
            fail: reject
        }, that)
    })
}

// 获取系统信息
export function getSystemInfo() {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success: resolve,
            fail: reject
        });
    })
}

// 显示操作菜单
export function showActionSheet(
    itemList: string[],
    itemColor: string = "#000000"
): Promise<ShowActionSheetSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
        wx.showActionSheet({
            itemList,
            itemColor,
            success: resolve,
            fail: reject
        })
    })
}

// 复制内容到剪切板
export function setClipboardData(value: string, toastValue: string = "复制成功", duration: number = 1500) {
    wx.setClipboardData({
        data: value,
        success: () => {
            toast(toastValue, duration, false)
        }
    });
}

//执行中加 loading
export function executeAddLoading(callback: () => Promise<unknown>, title: string = "加载中...", mask = true) {
    wx.hideLoading();
    wx.showLoading({ title: title, mask });
    return Promise.resolve().then(() => {
        return callback();
    }).finally(() => {
        wx.hideLoading();
    });
}

// 唤起微信用户授权
export function getUserProfile(options: { desc?: string | undefined; lang?: string | undefined; }) {
    let { desc = '', lang = "zh_CN" } = options
    return wxPromisify("getUserProfile", { lang: lang, desc: desc });
}

// 不推荐使用
function wxPromisify(functionName: string, params: any) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        wx[functionName]({
            ...params,
            success: resolve,
            fail: reject
        });
    });
}
