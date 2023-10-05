"use client"

import User from "@/models/user";
import axios from "axios";
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
    registerUser:(usr: RegisterUserType) => void;
}

export const AuthenticationContext = createContext({ } as IAuthenticationContext);

const AuthenticationContextProvider = ({ children }: any) => {
    
    const [user, setUser] = useState(null);

    const router = useRouter()

    const registerUser = ({name, email, password}: RegisterUserType) => {
        axios.post(`/api/register`, {
            name, email, password
        }).then(() => {
            toast.success("Account created. You can signin now.")
            router.push("/signin")
        })
        .catch(error => {
            toast.error(error.message)
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