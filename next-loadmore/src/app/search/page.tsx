import Change from './change'
import { data } from './const'
import DataShow from './data-show'

// export function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }, { id: '3' }]
// }

const Search = ({ searchParams }: any) => {
  const id = searchParams.id
  const target = data.filter((item) => item.id == id)
  return (
    <div>
      <div className="w-[800px] mx-auto">
        <DataShow target={target}></DataShow>
      </div>
      <div className="fixed top-[50%] translate-y-[-50%] text-white">
        <Change></Change>
      </div>
    </div>
  )
}

export default Search
