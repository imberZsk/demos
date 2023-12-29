import './App.css'

function App() {
  return (
    <div>
      <button onClick={() => methodDoesNotExist()}>Break the world</button>
      <button
        onClick={() => {
          console.log('666')
        }}
      >
        点击666
      </button>
    </div>
  )
}

export default App
