import { loginData, signupData } from "@/types/user.types"

const host = process.env.NEXT_PUBLIC_HOST


export const createCandidate = async (email:string,id:string) => {
    const token = localStorage.getItem('votingapp_user')
    const result = await fetch(`${host}/candidate/create/`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "token":token as string
        },
        body:JSON.stringify({
            email,
            electionId:id
        })
    })
    const res = await result.json()
    return res
}


export const getCandidatesForElection = async (id:string) => {
    const result = await fetch(`${host}/candidate/election/${id}`)    
    const res = await result.json()
    return res
}
