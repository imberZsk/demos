import { create } from 'zustand'

interface appsState {
  nums: number
  setNumber: (nums: number) => void
}

const useAppsStore = create<appsState>((set) => ({
  nums: 0,
  setNumber: (num) => {
    return set(() => ({
      nums: num
    }))
  }
}))

export default useAppsStore
