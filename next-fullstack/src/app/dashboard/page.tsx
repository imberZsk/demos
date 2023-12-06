import { users } from '../lib/temp-data'

export default async function Page() {
  const add = () => {}

  const update = () => {}

  const del = () => {}

  const search = () => {}

  return (
    <div>
      <div className="mb-[10px]">
        {users.map((item, index) => {
          return (
            <div key={index} className="flex gap-[20px] w-[400px]">
              <div>id:{item.id}</div>
              <div>name:{item.name}</div>
              <div>email:{item.email}</div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-4">
        <button onClick={add}>新增</button>
        <button onClick={update}>修改</button>
        <button onClick={del}>删除</button>
        <button onClick={search}>查询</button>
      </div>
    </div>
  )
}
