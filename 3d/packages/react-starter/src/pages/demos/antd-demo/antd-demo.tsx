import { Button } from 'antd'
// antd 默认支持基于 ES modules 的 tree shaking，但体积还是很大，不建议用
// antd5 可能有样式兼容性问题：https://ant.design/docs/react/compatible-style-cn

const AntdDemo: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="my-10">体积分析/按需引入/CSS兼容性</h1>
      <Button className="bg-pink-400">Antd</Button>
    </div>
  )
}

export default AntdDemo
