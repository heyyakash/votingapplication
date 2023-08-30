import Home from '@/components/Home'
import { useState } from 'react'



export default function App() {
  const [modal, setModal] = useState(false)
  return (
    <>    
    <Home />
    </>
  )
}
