const host = process.env.NEXT_PUBLIC_HOST as string

export const castVote = async (election_id: string, candidate_id: string) => {
    const token = localStorage.getItem("votingapp_user") as string
    const result = await fetch(`${host}/vote/${election_id}`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            candidate_id
        })
    })
    const res = await result.json()
    return res
}