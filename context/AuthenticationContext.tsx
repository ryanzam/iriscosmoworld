"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

type RegisterUserType = {
    name: string,
    email: string,
    password: string
}

export interface IAuthenticationContext {
    user: any;
    setUser: any;
    registerUser: (usr: RegisterUserType) => void;
}

export const AuthenticationContext = createContext({} as IAuthenticationContext);

const AuthenticationContextProvider = ({ children }: any) => {

    const [user, setUser] = useState(null);

    const router = useRouter()

    const registerUser = ({ name, email, password }: RegisterUserType) => {
        axios.post(`${process.env.BASE_URL}/api/register`, {
            name, email, password
        }).then(() => {
            toast("We've sent you an email. Please check your email and Verify");
            router.push("/signin")
        }).catch(function (error: any) {
            if (error?.response?.status === 500) {
                const res = error?.response?.data?.message
                if (res?.name === "ValidationError") {
                    toast.error(res?.errors?.email?.message)
                    return
                }
                toast.error(res)
                return
            }
            toast.error(error)
            return
        })

    }

    return (
        <AuthenticationContext.Provider
            value={{ user, setUser, registerUser }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider