"use client"

import { CartItemsContext } from "@/context/CartContext";
import { getGrossTotal } from "@/utils/getProductsCalc";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useContext, useState } from "react";
import { UserType } from "../modals/ProfileModal";
import Image from "next/image";
import { usePathname } from 'next/navigation'

interface INavProps {
    user?: UserType | null
}

const Nav: FC<INavProps> = ({ user }) => {
    const [search, setSearch] = useState("")
    const [checked, setChecked] = useState(true)
    const { cartItems } = useContext(CartItemsContext)
    const router = useRouter();
    const path = usePathname()

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (search) {
            router.push("/?search=" + search);
            setSearch("")
        }
    }

    const handleViewCart = () => {
        router.push("/cart")
    }

    const onModeChange = (e: any) => {
        setChecked(e.target.checked)
    }

    const searchBar = () => {
        if(!(path === "/")) return
        return <form className="xs:order-2" onSubmit={handleSubmit}>
        <div className="join">
            <input type="text" className="input input-bordered join-item" placeholder="Search..."
                value={search} onChange={e => setSearch(e.target.value)}
            />
            <button className="btn border-gray-300 join-item rounded-r-full">Search</button>
        </div>
    </form>
    }

    return (
        <div className="navbar bg-base-200 shadow-md mb-5 flex justify-between sm:flex xs:flex-col xs:gap-1 xs:mb-0">
            <div className="flex">
                <a href="/" className="normal-case text-xl flex flex-row items-center">
                    <Image src="/images/logo.png" height={40} width={40} alt="iris" />
                    <span className="font-semibold">Iris Cosmo World</span>
                </a>
            </div>

            {searchBar()}

            <div className="flex-none gap-3">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{cartItems.length} Items</span>
                            <span className="text-base-500">Subtotal: €{getGrossTotal(cartItems)}</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block btn-sm" disabled={!(cartItems.length > 0)} onClick={handleViewCart}>View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    {!user ?
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={() => router.push("/signin")}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        </label> :
                        <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                {user?.image ? <Image src={user?.image} className="w-4 h-4" alt="profile" /> : <p>{user?.name?.split(" ")[0]}</p>}
                            </label>
                            <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between" href="/user">
                                        Dashboard
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a onClick={async () => await signOut()}>Signout</a></li>
                            </ul>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Nav