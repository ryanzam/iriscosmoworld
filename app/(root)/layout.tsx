"use client"
import React from 'react'
import Carousel from '../components/Carousel'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPricetagsOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { usePathname, useRouter } from 'next/navigation';
import { LuBadgeCheck } from "react-icons/lu";

const HomeLayout = ({ children }: any) => {

  const router = useRouter()
  const pathname = usePathname()

  const showAllProducts = () => {
    router.push("/products")
  }

  return (
    <>
      <Carousel />

      <div className='flex bg-pink-300 w-full justify-between p-10 mt-[-7px] xs:py-3 xs:px-3'>
        <div className='flex items-center gap-2 xs:flex-col'>
          <div className='bg-white p-3 rounded-full'>
            <IoMdCheckmarkCircleOutline size={30} />
          </div>
          <div>
            <h4 className='text-xl font-bold xs:hidden'>We offer you</h4>
            <p className='xs:font-bold'>Best products</p>
          </div>
        </div>

        <div className='flex items-center gap-2 xs:flex-col'>
          <div className='bg-white p-3 rounded-full'>
            <IoPricetagsOutline size={30} />
          </div>
          <div>
            <h4 className='text-xl font-bold xs:hidden'>We offer you</h4>
            <p className='xs:font-bold'>Best price</p>
          </div>
        </div>

        <div className='flex items-center gap-2 xs:flex-col'>
          <div className='bg-white p-3 rounded-full'>
            <TbTruckDelivery size={30} />
          </div>
          <div>
            <h4 className='text-xl font-bold xs:hidden'>We offer you</h4>
            <p className='xs:font-bold'>Fast Delivery</p>
          </div>
        </div>
      </div>

      <div className='mt-1'>
        <div className='my-10 xs:my-3'>
          <h3 className='uppercase font-bold xs:hidden mt-10'>Latest products</h3>

          <div className='flex justify-between items-center'>
            <h3 className='text-secondary'>On Sale</h3>
            <button onClick={showAllProducts} className="btn btn-outline btn-primary btn-sm">All Products</button>
          </div>
          {children}
        </div>

        <div className="card card-side bg-base-200 shadow-xl my-10 flex-row-reverse">
          <figure>
            <img
              src="https://img.freepik.com/free-photo/collection-beauty-care-products-with-pink-tones_23-2151005531.jpg"
              alt="cosmetics" />
          </figure>
          <div className="card-body">

            <div className="flex flex-col justify-between p-4 leading-normal">
              <LuBadgeCheck size={50} />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Get high quality products!</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Choose from a wide range of collection.</p>
              <div className="card-actions hover:opacity-[.7]">
                <button onClick={showAllProducts} className="btn btn-outline btn-secondary">Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeLayout