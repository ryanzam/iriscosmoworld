import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const FeaturedSection = () => {

    const router = useRouter()

    return (
        <section className="py-16 px-6">
            <div className="max-w-full mx-auto grid grid-cols-3 xs:grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-300 p-6 rounded-3xl flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src="/images/haircare.jpg"
                                    alt="Skincare collection"
                                    className="w-48 h-48 object-cover"
                                    height={200}
                                    width={300}
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-4xl font-display font-bold">10% <span className="text-2xl">off</span></h3>
                            <p className="mt-2 text-gray-700">on all items</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="rounded-full px-6 py-3 bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-2" onClick={() => router.push("/products")}>
                            Visit The Shop
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden relative flex flex-col items-end">
                    <img
                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                        alt="Woman with face mask"
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>

                <div className="bg-neutral-200 bg-lavender-light p-6 rounded-3xl flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-xl font-bold">Exclusive Offer</h3>
                        <p className="mt-2 text-gray-700">Free Shipping on Rs.1000+</p>
                    </div>
                    <div className="mt-6">
                        <button className="rounded-full px-6 py-3 bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-2" onClick={() => router.push("/products")}>
                            Visit The Shop
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection