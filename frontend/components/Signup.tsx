import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface props {
    setMode: Dispatch<SetStateAction<string>>
}

interface data {
    firstname: string,
    lastname: string,
    email: string,
    password: string
    age:number,
    gender:string
}

const SignupComponent: React.FC<props> = ({ setMode }) => {
    const submitDetails = async (data: data) => {
        console.log(data)
    }
    const { handleSubmit, register } = useForm<data>()

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold mb-6">Signup</h1>
            <form onSubmit={handleSubmit(submitDetails)} className="w-[390px]">
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-sm font-medium mb-1">
                        First Name
                    </label>
                    <input
                        {...register("firstname")}
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="input-primary"
                        placeholder="Enter your first name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-sm font-medium mb-1">
                        Last Name
                    </label>
                    <input
                        {...register("lastname")}
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="input-primary"
                        placeholder="Enter your last name"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="mb-4 w-[30%]">
                        <label htmlFor="age" className="block text-sm font-medium mb-1">
                            Age
                        </label>
                        <input
                            {...register("age")}
                            type="number"
                            id="age"
                            name="age"
                            className="input-primary appearance-none"
                            placeholder="Age"
                        />
                    </div>
                    <div className="mb-4 flex-grow">
                        <label htmlFor="gender" className="block text-sm font-medium mb-1">
                            Gender
                        </label>
                        <select
                            {...register("lastname")}
                            id="gender"
                            name="gender"
                            className="input-primary py-[.630rem]"
                        >   
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        name="email"
                        className="input-primary"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        name="password"
                        className="input-primary"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 w-full text-white rounded-sm hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setMode("login")}
                        type="button"
                        className="bg-white py-2 rounded-sm text-blue-500 w-full hover:underline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupComponent;
