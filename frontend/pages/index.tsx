import { getAllElections } from '@/api/election'
import Home from '@/components/Home'
import { Election } from '@/types/election.type'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'



export default function App() {
  const [modal, setModal] = useState(false)
  const router = useRouter()
  const [data, setData] = useState<Election[]>([])
  useQuery(['elections'], async () => await getAllElections(), {
    onSuccess: (d) => {
      if (d.status) {
        setData(d.msg)
      }
    }
  })
  useEffect(() => {
    const token = localStorage.getItem("votingapp_user")
    if (!token) router.push('/login')
  }, [])
  return (
    <>
      <Home />
      <section>
        <div className='max-w-screen-xl mx-auto'>
          <h3>Elections</h3>
          {data.length===0?(<div className='flex h-[200px] items-center justify-center'>No Elections going on</div>)
          :(<div className='flex gap-8 my-6'>
            {data.map((x,i)=>{
              return(
              <Link href = {`/vote/${x._id}`} key = {i} className='flex bg-white/20 hover:bg-white hover:text-black rounded-lg p-8 cursor-pointer flex-col  items-start'>
                <p className='text-2xl font-bold '>{x.electionName}</p>
                <p className='mt-4 opacity-60 font-semibold'>{x.electionTopic}</p>
                <p>{x.electionDescription}</p>
              </Link>)
            })}
          </div>)}
        </div>

      </section>
    </>
  )
}


export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery(['elections'], async () => await getAllElections())
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}