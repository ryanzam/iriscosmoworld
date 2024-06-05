"use client"

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import toast from "react-hot-toast";

const RegisterPage = () => {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const router = useRouter()
    const { registerUser } = useContext(AuthenticationContext)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(password !== passwordConfirm) {
            toast.error("Passwords don't match. Try again.")
            return
        }
        setLoading(true)
        registerUser({ name, email, password })
        setLoading(false)
    }

    return (
        <div className="card w-1/2 xs:w-3/4 bg-base-100 shadow-2xl m-auto mt-14 flex items-center" onSubmit={handleSubmit}>
            <form className="form-control w-full p-5 flex gap-5">
                <TextInput label="Enter Full name"
                    placeHolder="Full name"
                    type="text"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput label="Enter Email"
                    placeHolder="Email"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput label="Enter Password (8 characters minimum)"
                    placeHolder="Password"
                    type="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                />
                <TextInput label="Confirm Password"
                    placeHolder="Password"
                    type="password"
                    required={true}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    minLength={8}
                />
                <button className="btn btn-primary" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                    Register
                </button>
                <hr />
                <p className="text-center">Already have an account? <a href="/signin" className="font-bold hover:text-neutral-500 cursor-pointer">Sign in</a></p>
            </form>
        </div>
    )
}

export default RegisterPage