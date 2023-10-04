"use client"
import Link from "next/link"
import { FC } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { RiAdminLine } from "react-icons/ri"

interface IDashboardNavProps {
    content: any
}

const DashboardNav: FC<IDashboardNavProps> = ({ content }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {content}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute -left-6">
                    <GiHamburgerMenu />
                </label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 bg-base-200 text-base-content gap-3">
                    <li>

                        <Link
                            href="/admin/products/new"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            New Product <span className="text-neutral-600-500"><RiAdminLine title="Admin"/></span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/products"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            All Products <span className="text-neutral-600-500"><RiAdminLine title="Admin"/></span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/orders"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            All Orders <span className="text-neutral-600-500"><RiAdminLine title="Admin"/></span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/users"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            All Users <span className="text-neutral-600-500"><RiAdminLine title="Admin"/></span>
                        </Link>
                    </li>

                    <hr />

                    <li>
                        <Link
                            href="/user"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            Your Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/user/orders"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/user/update"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            Update Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/user/update_password"
                            className="font-bold px-3 py-2 text-gray-800 hover:bg-neutral-300 hover:text-neutral-500 rounded-md"
                        >
                            Update Password
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <a
                            className="font-bold px-3 py-2 text-red-800 hover:bg-red-300 hover:text-white-500 rounded-md cursor-pointer"
                            onClick={undefined}
                        >
                            Logout
                        </a>
                    </li>
                </ul>

            </div>
        </div >
    )
}

export default DashboardNav