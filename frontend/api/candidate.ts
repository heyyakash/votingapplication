import { loginData, signupData } from "@/types/user.types"

const host = process.env.NEXT_PUBLIC_HOST


export const createCandidate = async (email:string) => {
    const result = await fetch(`${host}/candidate/create/`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email
        })
    })
    const res = await result.json()
    return res
}
