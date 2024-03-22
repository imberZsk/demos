import './App.css'
import { trpc } from './utils/trpc'

function App() {
  const { data, isLoading, isError } = trpc.queryUser.useQuery()
  trpc.queryUserById.useQuery(1)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div>
      {data?.map((user) => {
        return <div key={user.id}>{user.name}</div>
      })}
    </div>
  )
}

export default App
