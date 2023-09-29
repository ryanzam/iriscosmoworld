"use client"

import { IProduct } from "@/models/product"
import { FC } from "react"
import ProductCard from "@/app/components/products/ProductCard"
import ProductFilters from "../components/ProductFilters"

interface IProductsProps {
    products: IProduct[]
}

const Products:FC<IProductsProps> = ({ products }: IProductsProps) => {
    return (
        <div className="grid grid-cols-[.5fr_1.5fr] gap-5">
            <ProductFilters />
            <div>
                {products.map(p => (
                    <ProductCard key={p._id} product={p}/>
                ))}
            </div>
        </div>
    )
}

export default Products