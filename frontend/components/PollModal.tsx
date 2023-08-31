import modalState from '@/atoms/modal'
import { useAtom } from 'jotai'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

interface data{
    electionName:string
    electionTopic: string,
    electionDescription: string
}

const PollModal = () => {
    const { register, handleSubmit, reset } = useForm<data>()
    const [isOpen, setIsOpen] = useAtom(modalState)
    const closeModal = () => {
        reset()
        setIsOpen(false)
    }

    

    const onSumbit = (data:data) => {
        console.log(data)
    }

    if (isOpen)
        return (
            <section onClick={() => closeModal()} className='w-full h-screen fixed top-0 left-0 bg-white/10 z-100 grid place-items-center'>
                <div onClick={(e) => e.stopPropagation()} className="w-[550px] rounded-lg min-h-[500px] bg-black drop-shadow-xl ">
                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                        <h3 className='text-2xl'>Create a Poll</h3>
                        <IoIosClose onClick={() => closeModal()} className="text-4xl hover:text-red-500  cursor-pointer" />
                    </div>
                    <form onSubmit={handleSubmit(onSumbit)} className="p-4">
                        <div className='flex flex-col gap-2 mb-3'>
                            <label htmlFor="name" className='px-1 text-sm font-semibold'>Name of election</label>
                            <input type="text" {...register("electionName")} required  className='input-primary' placeholder='Enter the name of election' />
                        </div>
                        <div className='flex flex-col gap-3 mb-3'>
                            <label htmlFor="name" className='px-1 text-sm font-semibold'>Topic of election</label>
                            <input type="text" {...register("electionTopic")} required className='input-primary' placeholder='Enter the subject of election' />
                        </div>
                        <div className='flex flex-col gap-3 mb-3'>
                            <label htmlFor="name" className='px-1  text-sm font-semibold'>Description</label>
                            <textarea {...register("electionDescription")} required className='input-primary h-[180px]' placeholder='Enter the description of this election' />
                        </div>
                        <input type="submit" className='button' value="Add Candidates" />
                    </form>
                </div>
            </section>
        )
}

export default PollModal