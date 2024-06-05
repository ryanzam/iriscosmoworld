"use client"

import { useCallback, useState } from "react"
import TextInput from "../components/inputs/TextInput"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { PROD_URL } from "@/utils/constants"

const PasswordChangePage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const router = useRouter()

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            toast.error("Passwords don't match")
            return
        }

        await axios.put(`${PROD_URL}/api/changeForgotPassword`, { email, password })
        toast.success("Password changed successfully.")
        router.push("/signin")

    }, [password, passwordConfirm])

    return (
        <div className="card w-1/2 xs:w-3/4 bg-base-100 shadow-2xl m-auto mt-14 flex items-center py-5" onSubmit={handleSubmit}>
            <h1 className="font-bold text-right">Forgot Password</h1>
            <form className="form-control pb-0 w-full p-5 flex gap-5 xs:p-2 xs:gap-2" onSubmit={handleSubmit}>
                <TextInput label="Enter your email"
                    placeHolder="Email"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput label="Enter new password"
                    placeHolder="Enter Password"
                    type="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                />
                <TextInput label="Confirm new password"
                    placeHolder="Re-enter Password"
                    type="password"
                    required={true}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    minLength={8}
                />
                <button className="btn btn-primary btn-sm" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Save
                </button>
            </form>
        </div>)
}

export default PasswordChangePage