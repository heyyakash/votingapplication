import { createCandidate, getCandidatesForElection } from '@/api/candidate'
import { getElection } from '@/api/election'
import UserCard from '@/components/Card'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { QueryClient, dehydrate, useQuery } from 'react-query'

const App = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: result } = useQuery(['election', id], async () => await getElection(id as string))
    const [candidates, setCandidates] = useState<any[]>([])
    const { data:electionCandidates , isLoading, isError} = useQuery('candidates', async () => await getCandidatesForElection(id as string),{
        onSuccess:(d)=>{
            setCandidates(candidates => d.msg)
        }
    }) 
    const { msg: data } = result
    const { register, handleSubmit } = useForm<{email:string}>()
    const [loading, setLoading] = useState(false)
    

    const createAndFetchCandidate = async (data: { email: string }) => {
        const { email } = data
        const res = await createCandidate(email, id as string)
        if (res?.status) {
            console.log(res?.msg)
            setCandidates(candidates => [...candidates, res?.msg])
        }

    }

    return (
        <section className='mt-[9rem] '>
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="w-full bg-green-200/20 rounded-md p-4">
                    <h3>{data?.electionName}</h3>
                    <p>{data?.electionTopic}</p>
                    <p className='text-lg text-gray-400'>{data?.electionDescription}</p>
                </div>

                <br />

                <div className="w-full bg-white/10 rounded-md p-8">
                    <h3>Add Candidates</h3>
                    <form onSubmit={handleSubmit(createAndFetchCandidate)}>
                        <div className='flex flex-col gap-2 my-2'>
                            <label htmlFor="name" className='px-1 text-sm font-semibold'>Email of the candidate</label>
                            <input type="email" required {...register("email")}  className='input-primary' placeholder='Enter the email of the candidate' />
                        </div>
                        <button type="submit"  className='button'>Add Candidate</button>
                    </form>
                    <div className="flex gap-6  flex-wrap items-center">
                        {candidates.map((x, i) => {
                            const { firstname, lastname, age, gender, email } = x?.uid
                            return (
                                <UserCard key={i} profileImage='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' name={firstname + " " + lastname} email={email} age={age} gender={gender} />
                            )
                        })}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default App

export const getServerSideProps = async (ctx: any) => {
    const { id } = ctx.params
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['election', id], async () => await getElection(id))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}