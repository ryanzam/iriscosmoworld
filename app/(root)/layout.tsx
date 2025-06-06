"use client"
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { LuBadgeCheck } from "react-icons/lu";
import HeroSection from '../components/HeroSection';
import FeaturedSection from '../components/FeaturedSection';
import Image from "next/image";

const HomeLayout = ({ children }: any) => {

  const router = useRouter()
  const pathname = usePathname()

  const showAllProducts = () => {
    router.push("/products")
  }

  return (
    <div className='min-h-screen'>

      <HeroSection />
      <FeaturedSection />

      <div className='xs:px-3'>
        <div className='my-10 xs:my-0'>
          <h3 className='uppercase font-bold mt-10 xs:mt-4'>Latest products</h3>

          <div className='flex justify-between items-center'>
            <h3 className='text-gray-700 text-xl'>On Sale</h3>
          </div>
          {children}
        </div>

        <div className="card card-side bg-base-200 shadow-xl my-10 flex-row-reverse">
          <figure className='w-1/2'>
            <Image
              src="/images/fragrances.jpg"
              alt="cosmetics"
              height={200}
              width={500} />
          </figure>
          <div className="card-body xs:p-2">
            <div className="flex flex-col justify-between p-4 leading-normal xs:p-0 gap-5">
              <LuBadgeCheck size={50} className='xs:h-6' />
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white xs:text-sm">Get high quality products!</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 xs:text-sm">Choose from a wide range of collection.</p>
              </div>
              <div className="card-actions hover:opacity-[.7]">
                <button onClick={showAllProducts} className="btn btn-lg bg-black text-white rounded-full hover:bg-neutral-700">Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default HomeLayout