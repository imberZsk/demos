import { Suspense } from 'react'
import Demo from './_component/demo'

const Test: React.FC = async () => {
  return (
    <div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
        assumenda ab porro eum numquam optio deserunt nemo quam recusandae
        dolorem, iusto dolore quasi vel accusantium autem earum! Possimus,
        necessitatibus similique?
      </div>
      <Suspense fallback={<div>Loadingsuspense...</div>}>
        <Demo />
      </Suspense>
    </div>
  )
}

export default Test
