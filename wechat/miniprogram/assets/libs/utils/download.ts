export function downLoadFileApi(url: string): Promise<{ tempFilePath: string }> {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success: resolve,
            fail: reject
        });
    })
}
