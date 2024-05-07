import './index.css'
import MagicGrid from 'magic-grid'
import { ArrData } from './const'
import { useEffect } from 'react'
const Index: React.FC = () => {
  useEffect(() => {
    const magicGrid = new MagicGrid({
      animate: false,
      useMin: true,
      useTransform: false,
      container: '#fall',
      static: true,
      gutter: 20,
      maxColumns: 3
    })
    magicGrid.listen()
  }, [])

  const elements = document.querySelectorAll('#grid-fall li') // 为了监听下拉刷新
  useEffect(() => {
    const handle = () => {
      // 拿到动态的节点
      const faId = document.getElementById('grid-fall')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      faId?.childNodes.forEach((item: any) => {
        const clientHeight = item.clientHeight || 0
        const count = parseInt(clientHeight)
        const result = `auto / span ${count}`
        item.style.gridRow = result
      })
    }
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [elements])

  return (
    <div>
      <div className="py-10 text-center">
        ------------- 定位瀑布流 -------------
      </div>
      <div id="fall">
        {ArrData.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[600px] bg-pink-400"
              style={{
                height: item
              }}
            >
              {index}
            </div>
          )
        })}
      </div>

      <div className="py-20 text-center">
        ------------- grid瀑布流 -------------
      </div>
      <ul id="grid-fall">
        {ArrData.map((item, index) => {
          return (
            <li key={index} className="son">
              <div
                className="inner bg-pink-400"
                style={{
                  height: item
                }}
              ></div>
              {index}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Index
