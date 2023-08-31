const host = process.env.NEXT_PUBLIC_HOST

interface electionData {
    electionName:string
    electionTopic: string,
    electionDescription: string
}

export const createELection = async (data:electionData) => {
    const result = await fetch(`${host}/election/create`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem("votingapp_user") as string
        },
        body:JSON.stringify(data)
    })
    const res = await result.json()
    return res
}



export const getElection = async (id:string) => {
    const result = await fetch(`${host}/election/${id}`)
    const res = await result.json()
    return res
}