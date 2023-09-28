"use client"

import { IProduct } from "@/models/product"
import { FC } from "react"
import ProductCard from "@/app/components/products/ProductCard"

interface IProductsProps {
    products: IProduct[]
}

const Products:FC<IProductsProps> = ({ products }: IProductsProps) => {
    return (
        <div>
            {products.map(p => (
                <ProductCard key={p._id} product={p}/>
            ))}
        </div>
    )
}

export default Products