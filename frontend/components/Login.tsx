import { loginUser } from '@/api/user';
import { loginData } from '@/types/user.types';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface props {
    setMode: Dispatch<SetStateAction<string>>
}



const LoginComponent: React.FC<props> = ({ setMode }) => {
    const router = useRouter()
    const submitDetails = async (data: loginData) => {
        const res = await loginUser(data)
        if(res?.status){
            localStorage.setItem('votingapp_user',res?.authToken)
            router.back()
        }
    }
    const { handleSubmit, register } = useForm<loginData>()
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold mb-6">Welcome Back!</h1>
            <form onSubmit={handleSubmit(submitDetails)} className="w-[390px]">
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
                        Login
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        type="button"
                        className="bg-white py-2 rounded-sm text-blue-500 w-full hover:underline"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginComponent;
