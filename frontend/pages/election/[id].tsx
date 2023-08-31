import { getElection } from '@/api/election'
import { useRouter } from 'next/router'
import React from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

const App = () => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useQuery(['election', id], async () => await getElection(id as string))
    console.log(data)
    return (
        <div>App</div>
    )
}

export default App

export const getServerSideProps = async (ctx:any) => {
    const { id } = ctx.params
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['election', id], async () => await getElection(id))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}