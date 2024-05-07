import Button from '@/comps/custom-button'
import useAppsStore from '@/store/app'
const ZustandDemo: React.FC = () => {
  const { nums, setNumber } = useAppsStore()
  const handleNum = () => {
    setNumber(nums + 1)
  }
  return (
    <div className="p-10">
      <h1 className="my-10">数据/更新</h1>
      <Button click={handleNum}>点击事件</Button>
      <h1 className="py-10">{nums}</h1>
    </div>
  )
}

export default ZustandDemo
