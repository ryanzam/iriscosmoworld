"use client"

import { TfiSpray } from "react-icons/tfi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdFace4 } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { GiHairStrands } from "react-icons/gi";

import React from 'react'
import { usePathname, useRouter } from "next/navigation";

const CategoryCard = () => {

    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (category: string) => {
        router.push(pathname + `products?category=${category}`)
    }

    return (
        <div className="grid grid-cols-5">
            <div onClick={() => handleClick("Fragrances")} className="hover:cursor-pointer hover:opacity-[0.7] bg-primary max-h-48 max-w-48 text-white flex flex-col items-center justify-center py-3" >
                <TfiSpray size={50} />
                <p className="font-bold text-2xl xs:text-sm">Fragrances</p>
            </div>
            <div onClick={() => handleClick("Haircare")} className="hover:cursor-pointer hover:opacity-[0.7] bg-blue-900 max-h-48 max-w-48 text-white flex flex-col items-center justify-center py-3" >
                <GiHairStrands size={50} />
                <p className="font-bold text-2xl xs:text-sm">Hair Care</p>
            </div>
            <div onClick={() => handleClick("Hobbies")} className="hover:cursor-pointer hover:opacity-[0.7] bg-blue-500 max-h-48 max-w-48 text-white flex flex-col items-center justify-center py-3" >
                <IoGameControllerOutline size={50} />
                <p className="font-bold text-2xl xs:text-sm">Hobbies</p>
            </div>
            <div onClick={() => handleClick("Skincare")} className="hover:cursor-pointer hover:opacity-[0.7] bg-pink-400 max-h-48 max-w-48 text-white flex flex-col items-center justify-center py-3" >
                <MdFace4 size={50} />
                <p className="font-bold text-2xl xs:text-sm">Skin Care</p>
            </div>
            <div onClick={() => handleClick("Wellness")} className="hover:cursor-pointer hover:opacity-[0.7] bg-secondary max-h-48 max-w-48 text-white flex flex-col items-center justify-center py-3" >
                <MdOutlineHealthAndSafety size={50} />
                <p className="font-bold text-2xl xs:text-sm">Wellness</p>
            </div>

        </div>
    )
}

export default CategoryCard