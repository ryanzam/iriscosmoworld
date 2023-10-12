"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { FC } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { RiAdminLine } from "react-icons/ri"
import { GoPackageDependents } from "react-icons/go"
import { BiUser } from "react-icons/bi"
import { AiOutlineLogout } from "react-icons/ai"

interface IDashboardNavProps {
    content: any;
    admin: any;
}

const DashboardNav: FC<IDashboardNavProps> = ({ content, admin }) => {

    const handleSignout = async () => {
        await signOut({ callbackUrl: "/" })
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mx-5">
                {content}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute -left-6 top-0">
                    <GiHamburgerMenu />
                </label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content gap-3">
                    {admin &&
                        <>
                            <li>
                                <Link
                                    href="/user/admin/products"
                                    className="font-bold px-3 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                                >
                                    <span className="text-neutral-600-500"><RiAdminLine title="Admin" /></span> All Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/user/admin/orders"
                                    className="font-bold px-3 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                                >
                                    <span className="text-neutral-600-500"><RiAdminLine title="Admin" /></span> All Orders
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/users"
                                    className="font-bold px-3 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                                >
                                    <span className="text-neutral-600-500"><RiAdminLine title="Admin" /></span> All Users
                                </Link>
                            </li>
                        </>}

                    <hr />

                    <li>
                        <Link
                            href="/user"
                            className="font-bold px-3 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            <BiUser /> My Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/user/orders"
                            className="font-bold px-3 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            <GoPackageDependents /> My Orders
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <a
                            className="font-bold px-3 py-2 text-red-800 hover:bg-red-300 hover:text-white-500 rounded-md cursor-pointer"
                            onClick={handleSignout}
                        >
                            <AiOutlineLogout /> Sign out
                        </a>
                    </li>
                </ul>

            </div>
        </div >
    )
}

export default DashboardNav