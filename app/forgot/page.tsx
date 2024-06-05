"use client"

import { useState } from "react"
import TextInput from "../components/inputs/TextInput"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { BsSend } from "react-icons/bs"


const ForgotPage = () => {

    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            toast('If the email is associated with an account, a password reset email will be sent.', { duration: 5000 })
            await axios.post(`/api/reset`, { email })
            router.push("/signin")
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset password email.');
        }
    }

    return (
        <div className="card w-1/2 xs:w-3/4 bg-base-100 shadow-2xl m-auto mt-14 flex items-center py-5" onSubmit={handleSubmit}>
            <h1 className="font-bold text-right">Forgot Password</h1>
            <form className="form-control pb-0 w-full p-5 flex gap-5 xs:p-2 xs:gap-2">
                <TextInput label="Email"
                    placeHolder="Enter your Email"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary btn-sm" type="submit">
                    <BsSend />
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPage