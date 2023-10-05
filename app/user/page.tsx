"use client"

import { useContext } from "react";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import Link from "next/link";

const UserPage = () => {

    const { user } = useContext(AuthenticationContext);

    return (
        <div className="p-3 border">
            <div className="flex items-start sm:items-center p-3">
                <img
                    className="w-20 h-20 rounded-full"
                    src={user?.avatar ? user?.avatar?.url : "/profile.jpg"}
                    alt={user?.name}
                />
                <div>
                    <h5 className="font-semibold text-lg">{user?.name}</h5>
                    <h5 className="font-semibold">Email: <span className="font-light">{user?.email}</span></h5> 
                    <h5 className="font-semibold">Created on: <span className="font-light text-sm">{user?.createdAt.split('T')[0]}</span></h5> 
                </div>
            </div>
            <hr className="my-4" />
            <Link href="/address/new">
                <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                    Add new address
                </button>
            </Link>
        </div>
    )
}

export default UserPage