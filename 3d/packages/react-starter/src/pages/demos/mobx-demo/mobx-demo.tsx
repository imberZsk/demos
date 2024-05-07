import Button from '@/comps/custom-button'
import store from '@/model'
import { observer, useLocalObservable } from 'mobx-react-lite'
const MobxDemo: React.FC = () => {
  const localStore = useLocalObservable(() => store)
  const handle = () => {
    localStore.setCount(localStore.count + 1)
  }
  return (
    <div className="p-10">
      <h1 className="my-10">数据/更新</h1>
      <Button click={handle}>点击事件</Button>
      <h1 className="py-10">{localStore.count}</h1>
    </div>
  )
}

export default observer(MobxDemo)
