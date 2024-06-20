// Page 装饰器
const oriPage = Page

export default Page = (data) => {

  // 页面加载统计 PV
  const onLoad = data.onLoad;
  data.onLoad = function(...args) {
    RecordPV.call(this)
    return onLoad && onLoad.call(this, ...args)
  }
  
  oriPage(data)
}

// Record PV
function RecordPV(this:any) {
  console.log('view the page : ', this.route)
  // sync serve..
  // fetch(apis.pv, data: { page: this.route })
}