"use client"

import User from "@/models/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import toast from "react-hot-toast";

type RegisterUserType = {
    name: string,
    email: string,
    password: string
}

export interface IAuthenticationContext {
    user: typeof User | null;
    setUser:Dispatch<SetStateAction<null>>;
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
            toast.success("Account created.")
            router.push("/")
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