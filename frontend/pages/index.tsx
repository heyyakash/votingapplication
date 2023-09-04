import Home from '@/components/Home'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'



export default function App() {
  const [modal, setModal] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem("votingapp_user")
    if(!token) router.push('/login')
  },[])
  return (
    <>    
    <Home />
    </>
  )
}
