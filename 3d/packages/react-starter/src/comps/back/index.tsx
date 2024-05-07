import { useNavigate } from 'react-router-dom'

const Back: React.FC = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }
  return (
    <div
      className="fixed right-14 bottom-14 bg-pink-600 rounded-3xl p-10"
      onClick={goHome}
    >
      <div>Back</div>
    </div>
  )
}

export default Back
