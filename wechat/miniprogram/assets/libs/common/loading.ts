/**
 * 有空看，两个疑问：
 * 1.this.loading 这个字段是否可以去掉。
 * 2.wx.showLoading 显示文字，这样写，同时几个请求一起发送，只显示第一个请求的 loadingText。
 * */

class Loading {
	loading: null | Promise<WechatMiniprogram.GeneralCallbackResult>
	loadingCount:  number 
	timerId: null | number

	constructor() {
			this.loading = null;    
			this.loadingCount = 0 ;  
			this.timerId = null ;
	}

	showLoading(loadingText:string, loadMask = true) {
			if (this.loadingCount === 0 && !this.loading) {
					this.loading = wx.showLoading({
							title: loadingText + '...',
							mask: loadMask
					});
			}
			this.loadingCount++;
	}

	hideLoading(hideLoadingType = "default") {
			if (hideLoadingType == "now") this.hideLoadingNow();
			else this.hideLoadingDefault();
	}

	hideLoadingNow() {
			wx.hideLoading();
			this.loading = null;
			this.loadingCount = 0;
			this.timerId = null;
	}

	hideLoadingDefault() {
			this.loadingCount--;
			this.loadingCount = Math.max(this.loadingCount, 0);
			if (this.loadingCount === 0) this._toHideLoading();
	}

	_toHideLoading() {
			if (this.timerId) clearTimeout(this.timerId);

			this.timerId = setTimeout(() => {
					wx.hideLoading();
					this.loading = null
			}, 100);
	}
}

export default Loading;
