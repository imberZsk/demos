import { useEffect, useState } from 'react'
import png1 from '@/assets/1.jpg'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'
import ColorThief from 'colorThief'
const Colorthief: React.FC = () => {
  const [color, setColor] = useState<number[]>([1, 1, 1])
  useEffect(() => {
    const colorThief = new ColorThief()
    const img = document.querySelector('img') as HTMLImageElement
    img.crossOrigin = 'anonymous'
    if (img.complete) {
      colorThief.getColor(img)
      setColor(colorThief.getColor(img, 1))
      console.log(colorThief.getColor(img, 1))
    } else {
      img.addEventListener('load', function () {
        setColor(colorThief.getColor(img))
        console.log(colorThief.getColor(img))
      })
    }
  }, [])
  return (
    <div className="flex flex-col items-center">
      <div>Colorthief</div>
      <img
        crossOrigin=""
        // crossOrigin="use-credentials"
        src={
          'https://ssm.res.meizu.com/admin/2023/06/15/1531678822/arjWXx0RFx.jpg'
        }
        alt=""
      />
      <br />
      <br />
      <br />
      <div>吸取的颜色</div>
      <br />
      <br />
      <br />
      <div
        className="h-20 w-20"
        style={{
          backgroundColor: `rgb(${color[0]},${color[1]},${color[2] - 10})`
        }}
      ></div>
    </div>
  )
}

export default Colorthief
