interface user {
    profileImage:string,
    email:string,
    name:string,
    age:number,
    gender:string
}

const UserCard:React.FC<user> = (user) => {
    return (
        <div className="w-[280px]  bg-black p-4 mt-4 shadow-md rounded-md overflow-hidden">
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
                <button className="button mb-[-.08rem] bg-red-500">Remove</button>
            </div>
        </div>
    );
};

export default UserCard;