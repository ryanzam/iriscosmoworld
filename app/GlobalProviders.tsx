"use client"

import AuthenticationContextProvider from "@/context/AuthenticationContext"
import CartContextProvider from "@/context/CartContext"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export default function GlobalProvider({ children }: any) {
    return (
        <>
            <Toaster />
            <AuthenticationContextProvider>
                <CartContextProvider>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </CartContextProvider>
            </AuthenticationContextProvider>
        </>

    )
}