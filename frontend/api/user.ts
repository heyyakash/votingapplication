import { loginData, signupData } from "@/types/user.types"

const host = process.env.NEXT_PUBLIC_HOST


export const createUser = async (data:signupData) => {
    const result = await fetch(`${host}/user/create/`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    const res = await result.json()
    return res
}

export const loginUser = async (data:loginData) => {
    const result = await fetch(`${host}/user/login`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    const res = await result.json()
    return res
}