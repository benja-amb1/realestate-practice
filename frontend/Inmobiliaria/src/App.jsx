import { useState } from 'react'
import './App.css'
import { Routing } from './routes/Routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routing />
    </>
  )
}

export default App
