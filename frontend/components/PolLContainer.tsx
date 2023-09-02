import React, { useReducer, useState } from 'react'
import { useQuery } from 'react-query'
import { getCandidatesForElection } from '@/api/candidate'
import { useRouter } from 'next/router'
import { candidate } from '@/types/candidate.types'
import Poll from './Poll'

const PollContainer = () => {
    const router = useRouter()
    const { election_id: id } = router.query
    const [candidates, setCandidates] = useState<string[]>([])
    const [votes, setVotes] = useState<number[]>([])
    useQuery('candidates', async () => await getCandidatesForElection(id as string), {
        onSuccess: (d) => {
            setCandidates([])
            setVotes([])
            d.msg.forEach((el: candidate) => {
                setCandidates(candidates => [...candidates, el.uid.firstname + " " + el.uid.lastname])
                setVotes(votes => [...votes, el.votes])
            });
        },
        enabled: !!id,
        refetchInterval:10000
    })
    return (
        <section>
            <div className="max-w-screen-xl w-full p-8 bg-white/10 mb-6 rounded-lg ">
                <h3>Poll Results</h3>
                {candidates.length>0 && votes.length>0?(
                    <Poll candidates = {candidates} votes = {votes} />
                ):(
                    <></>
                )}
                
            </div>
        </section>
    )
}

export default PollContainer