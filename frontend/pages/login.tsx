import LoginComponent from '@/components/Login'
import SignupComponent from '@/components/Signup'
import React, { useState } from 'react'

const App = () => {
    const [mode, setMode] = useState("login")
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