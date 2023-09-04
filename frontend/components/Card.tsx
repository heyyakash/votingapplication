import { castVote } from "@/api/vote";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

interface user {
    profileImage:string,
    email:string,
    name:string,
    age:number,
    gender:string
    type?:string
    candidateId?:string
    disabled?:boolean
}

const UserCard:React.FC<user> = (user) => {
    const router = useRouter()
    const {election_id} = router.query
    const queryClient = useQueryClient()
    const castUserVote = async () => {
        if(election_id && user.candidateId){
            const res = await castVote(election_id as string, user.candidateId)
            if(!res.status){
                    throw new Error("Couldn't complete action")
            }
            console.log(res)
        }
        
    }

    const {mutate} = useMutation(castUserVote,{
        onSuccess:()=>{
            console.log("success")
            queryClient.invalidateQueries('candidates')
            queryClient.invalidateQueries(['election', election_id])
            queryClient.invalidateQueries('eligible')

        },
        onError:(e)=>{
            console.log("Couldn't Cast Vote")
        }
    })

    return (
        <div className="md:w-[280px] w-full bg-black p-4 mt-4 shadow-md rounded-md overflow-hidden">
            <div className="p-4 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                </div>
                <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
                <p className="text-gray-600">{user.age} years old</p>
                <p className="text-gray-600">{user.gender}</p>
                <p className="mt-2 text-gray-600">{user.email}</p>
                {user.type && user.type==="vote"?(<button onClick={()=>mutate()} disabled = {user.disabled} className="button mb-[-.08rem] bg-green-500">Vote</button>):(<button className="button mb-[-.08rem] bg-red-500">Remove</button>)}
                
            </div>
        </div>
    );
};

export default UserCard;