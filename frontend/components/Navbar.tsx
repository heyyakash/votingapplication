import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {FaSquarePollHorizontal} from 'react-icons/fa6'

const Navbar = () => {
    const router = useRouter()
    const logout = () =>{
        localStorage.removeItem("votingapp_user")
        router.push('/login')
    }
    const [showLogOut, setShowLogOut] = useState(false)
    useEffect(()=>{
       if(router.pathname==="/login") setShowLogOut(false)
       else setShowLogOut(true) 
    },[])

    return (
        <nav className="bg-black/80 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <FaSquarePollHorizontal className = "text-3xl mr-2" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Poll
                    </span>
                </Link>
                <div className="flex md:order-2">
                   {showLogOut?(
                     <button
                     onClick={()=> logout()}
                     type="button"
                     className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 "
                 >
                     Logout
                 </button>
                   ):(<></>)}
                  
                </div>
            </div>
        </nav>

    )
}

export default Navbar