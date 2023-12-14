import Button from '@/comps/custom-button'
import html2canvas from 'html2canvas'
import { useState } from 'react'

const Html2canvasDemo: React.FC = () => {
  const [imgUrl, setImgUrl] = useState('')
  const copy = () => {
    html2canvas(document.querySelector('.block') as HTMLElement, {
      //在线图片域名需要配置允许跨域访问
      //为了给图片配置crossorigin="anonymous"
      useCORS: true, //开启跨域配置
      allowTaint: true, //允许跨域图片
      backgroundColor: 'transparent' //背景色
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0) //获取到的图片url
      setImgUrl(imgData)
    })
  }

  return (
    <div className="p-10">
      <div className="py-10 block">
        <img
          src="https://img.res.meizu.com/img/download/uc/14/57/35/72/00/14573572/w200h200?t=1683473582000"
          alt=""
          className="img"
        />
      </div>
      <Button click={copy}>截图</Button>
      <div>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  )
}

export default Html2canvasDemo
