const host = process.env.NEXT_PUBLIC_HOST

interface electionData {
    electionName:string
    electionTopic: string,
    electionDescription: string
}

export const createELection = async (data:electionData) => {
    console.log(data)
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


export const checkEligibilty = async (id:string) => {
    const token = localStorage.getItem("votingapp_user")
    if(token!==null && token!==undefined){
        const result = await fetch(`${host}/election/eligible/${id}`,{
            headers:{
                "token":localStorage.getItem("votingapp_user") as string
            }
        })
        const res = await result.json()
        return res  
    }
}



export const getElection = async (id:string) => {
    const result = await fetch(`${host}/election/${id}`)
    const res = await result.json()
    return res
}