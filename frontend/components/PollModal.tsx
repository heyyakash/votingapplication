import modalState from '@/atoms/modal'
import { useAtom } from 'jotai'
import React from 'react'
import {IoIosClose} from 'react-icons/io'

const PollModal = () => {
    const [isOpen, setIsOpen] = useAtom(modalState)
    const closeModal = () => {
        setIsOpen(false)
    }

    if(isOpen)
    return (
        <section onClick={()=>closeModal()} className='w-full h-screen fixed top-0 left-0 bg-white/5 z-100 grid place-items-center'>
            <div onClick={(e)=>e.stopPropagation()} className="w-[550px] h-[500px] bg-black drop-shadow-lg ">
                <div className="flex items-center justify-between p-4 border-b border-gray-600">
                    <h3 className='text-2xl'>Create a Poll</h3>
                    <IoIosClose onClick = {()=>closeModal()} className = "text-4xl hover:text-red-500  cursor-pointer" />
                </div>
            </div>
        </section>
    )
}

export default PollModal