import LoginComponent from '@/components/Login'
import SignupComponent from '@/components/Signup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const App = () => {
    const [mode, setMode] = useState("login")
    const router=  useRouter()
    useEffect(()=>{
        const token = localStorage.getItem("votingapp_user")
        if(token) router.push("/")
    },[])
    return (
        <div className=" text-white bg-no-repeat bg-cover min-h-screen flex items-center justify-center">
            {mode==="login"?(
                <LoginComponent setMode={setMode} />
            ):(
                <SignupComponent setMode={setMode} />
            )}

        </div>
    )
}

export default App