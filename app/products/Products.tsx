"use client"

import { IProduct } from "@/models/product"
import { FC } from "react"
import ProductCard from "@/app/components/products/ProductCard"
import ProductFilters from "../components/products/ProductFilters"
import Empty from "../components/Empty"
import Pagination from "../components/Pagination"
import Carousel from "../components/Carousel"
import { useSearchParams } from 'next/navigation'
import Hero from "../components/hero/Hero"

export type data = {
    products: IProduct[],
    pageSize: number,
    total: number
}

interface IProductsProps {
    data: data
}

const Products: FC<IProductsProps> = ({ data }: IProductsProps) => {

    const searchParams = useSearchParams()
    const category = searchParams?.get("category")
    const pageNum = searchParams?.get("page")
    const minMax = searchParams?.get("min")
    const search = searchParams?.get("search")
    const ratings = searchParams?.get("ratings")


    const renderLatestProducts = () => {
        if (category || pageNum || minMax || search || ratings) return

        if (data.products.length > 0) {
            return <div className="">
                <h1 className="text-2xl font-semibold pb-3">Latest products</h1>
                <div className="grid grid-cols-3 gap-x-5 xs:grid-cols-1">
                    {data.products.slice(-3).map(p => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </div>
        }
        return
    }

    const renderProductsTitle = () => {
        if (category || pageNum || minMax || search || ratings) return
        
        return <h1 className="text-2xl font-semibold py-3">All products</h1>
    }

    const renderProducts = () => {
        if (data.products.length === 0) {
            return <div>
                <Empty title="No product found" showResetBtn={true} />
            </div>
        }
        return (
            <div>
                {renderProductsTitle()}
                <div className="grid grid-cols-3 gap-x-5 xs:grid-cols-1">
                    {data.products.map(p => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>

                <Pagination total={data.total} pageSize={data.pageSize} />
            </div>
        )
    }

    const renderHero = () => {
        if (category === "Fragrances") {
            return <Hero imgpath="/images/fragrances.jpg" category={category} />
        }
        if (category === "Hobbies") {
            return <Hero imgpath="/images/hobbies.jpg" category={category} />
        }
        if (category === "Haircare") {
            return <Hero imgpath="/images/haircare.jpg" category={category} />
        }
        if (category === "Skincare") {
            return <Hero imgpath="/images/skincare.jpg" category={category} />
        }
        if (category === "Wellness") {
            return <Hero imgpath="/images/wellness.jpg" category={category} />
        }

        return <Carousel />
    }

    return (
        <div className="grid grid-cols-[.5fr_1.5fr] gap-5 xs:flex xs:flex-col xs:gap-1">
            <ProductFilters />
            <div>
                {renderHero()}
                {renderLatestProducts()}
                {renderProducts()}
            </div>
        </div>
    )
}

export default Products