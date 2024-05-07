import { makeAutoObservable } from 'mobx'

const store = makeAutoObservable({
  count: 0,
  setCount: (count: number) => {
    store.count = count
  }
})

export default store
