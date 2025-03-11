"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import TextInput from "../components/inputs/TextInput";

const SigninPage = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { data: session } = useSession();
    const router = useRouter()
    
    useEffect(() => {
        if (session?.user) {
            router.push("/");
        }
    }, [session, router]);

    const handleSubmit = (e: any) => {
        e.preventDefault()

        setLoading(true)

        signIn("credentials", {
            email, password, callbackUrl: `${process.env.BASE_URL}/user`, redirect: false
        }).then(cb => {
            if (cb?.ok) {
                toast.success("Successfully signed in")
                window.location.href = "/user"
            }
            if (cb?.error) {
                toast.error(cb.error)
            }
        })
        setLoading(false)
    }

    return (
        <div className="card w-1/2 xs:w-11/12 bg-base-100 shadow-2xl m-auto mt-14 flex items-center py-5" onSubmit={handleSubmit}>
            <form className="form-control pb-0 w-full p-5 flex gap-5 xs:p-2 xs:gap-2">
                <TextInput label="Enter Email"
                    placeHolder="Email"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput label="Enter Password"
                    placeHolder="Password"
                    type="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                />
                <button className="btn bg-black text-white btn-sm" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign in
                </button>
                <hr />
                <div className="flex justify-between">
                    <a href="/register" className="font-bold hover:text-neutral-500 cursor-pointer">Create an account</a>
                    <a href="/forgot" className="font-bold text-neutral-400  hover:text-neutral-800 cursor-pointer">Forgot password?</a>
                </div>
            </form>

            <div className="divider">OR</div>

            <button className="btn btn-sm xs:text-sm" onClick={() => signIn("google")}>
                <FcGoogle size={24} />
                Continue with Google
            </button>
        </div>
    )
}

export default SigninPage