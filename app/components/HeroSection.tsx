import React from 'react'
import StarRatings from 'react-star-ratings'
import Carousel from './Carousel'
import { FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const HeroSection = () => {

    const router = useRouter()

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-20 xs:py-10">
                <div className="grid grid-cols-2 xs:grid-cols-1 gap-8 items-center">
                    <div className="relative lg:order-1">
                        <div className="rounded-[2rem] overflow-hidden">
                            <Carousel />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 lg:order-2">
                        <h1 className="text-5xl xs:text-3xl lg:text-6xl font-display font-extrabold leading-tight">
                            Elevate your beauty and wellness.
                        </h1>

                        <div className="flex items-center space-x-1 mt-4">
                            <StarRatings rating={5}
                                numberOfStars={5}
                                starRatedColor="#ffab04"
                                starSpacing="1px"
                                starDimension="30px"
                                name="ratings"
                            />
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm max-w-sm">
                            <p className="text-gray-800">
                                &quot;Iris Cosmo World delivers elegance and quality products for an affordable price, perfect for everyone.&quot;
                            </p>
                        </div>

                        <div className="pt-2">
                            <button className="btn bg-black text-white text-lg px-5 hover:bg-neutral-600 btn-md font-bold rounded-[2rem]" onClick={() => router.push("/products")}>
                                Explore Collections
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection