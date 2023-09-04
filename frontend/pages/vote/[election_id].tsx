import { createCandidate, getCandidatesForElection } from '@/api/candidate'
import { checkEligibilty, getElection } from '@/api/election'
import UserCard from '@/components/Card'
import PollContainer from '@/components/PolLContainer'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QueryClient, dehydrate, useQuery } from 'react-query'

const App = () => {

    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("votingapp_user")
        if (!token) router.push('/login')
    }, [])
    const { election_id: id } = router.query
    const { data: result, isLoading } = useQuery(['election', id], async () => await getElection(id as string), {
        enabled: !!id
    })
    const [candidates, setCandidates] = useState<any[]>([])
    const { isLoading: candidateIsLoading } = useQuery('candidates', async () => await getCandidatesForElection(id as string), {
        onSuccess: (d) => {
            setCandidates(candidates => d.msg)
        }
    })
    const [isDisbled, setIsDisabled] = useState(true)
    const [heading, setHeading] = useState("Cast Your Vote")
    useQuery('eligible', async () => await checkEligibilty(id as string), {
        onSuccess: (d) => {
            if (d?.status) {
                if (d?.msg?.disabled) setHeading("Congratulatons! you have casted your vote")
                setIsDisabled(d?.msg?.disabled)
            }
        },
        onError: (e) => {
            console.log(e)
        }
    })


    return (
        <section className='mt-[9rem] '>
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="w-full bg-green-200/20  rounded-md p-8">
                    <h3>{result?.msg?.electionName}</h3>
                    <p>{result?.msg?.electionTopic}</p>
                    <p className='text-lg text-gray-400'>{result?.msg?.electionDescription}</p>
                </div>

                <br />
                <PollContainer />

                <div className="w-full bg-white/10 rounded-md p-8">
                    <h3>{heading}</h3>
                    <div className="flex gap-6  flex-wrap items-cente mt-4">
                        {candidates.map((x, i) => {
                            const { firstname, lastname, age, gender, email } = x?.uid
                            return (
                                <UserCard disabled={isDisbled} candidateId={x["_id"]} key={i} profileImage='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' name={firstname + " " + lastname} email={email} age={age} gender={gender} type={"vote"} />
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
    const { election_id: id } = ctx.params
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['election', id], async () => await getElection(id))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }

    // return {
    //     props:{

    //     }
    // }
}