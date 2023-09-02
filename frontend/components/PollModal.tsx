import { createELection } from '@/api/election'
import modalState from '@/atoms/modal'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

interface data{
    electionName:string
    electionTopic: string,
    electionDescription: string
    endDate:string
}

const PollModal = () => {
    const { register, handleSubmit, reset } = useForm<data>()
    const [isOpen, setIsOpen] = useAtom(modalState)
    const closeModal = () => {
        reset()
        setIsOpen(false)
    }
    const router = useRouter()
    const [loading, setLoading] = useState(false) 

    const onSumbit = async (data:data) => {
        setLoading(true)
        const {endDate} = data
        const endDateArray = endDate.split("-").reverse()
        data.endDate = endDateArray.join("-")
        const res = await createELection(data)
        if(res.status){
            setIsOpen(false)
            router.push(`election/${res.msg["_id"]}`)
        }
        setLoading(false)
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
                            <label htmlFor="date" className='px-1 text-sm font-semibold'>Topic of election</label>
                            <input type="date" {...register("endDate")} required className='input-primary' placeholder='Enter the Last date of election' />
                        </div>
                        <div className='flex flex-col gap-3 mb-3'>
                            <label htmlFor="name" className='px-1  text-sm font-semibold'>Description</label>
                            <textarea {...register("electionDescription")} required className='input-primary h-[180px]' placeholder='Enter the description of this election' />
                        </div>
                        <button disabled = {loading}  type="submit" className='button disabled:opacity-80 h-[3rem]' >{loading?(<img className='h-10 m-auto ' src = "/loading.gif"  />):(<>Add Candidates</>)}</button>

                    </form>
                </div>
            </section>
        )
}

export default PollModal