"use client"

import { IProduct } from "@/models/product"
import { FC } from "react"
import ProductCard from "@/app/components/products/ProductCard"
import ProductFilters from "../components/products/ProductFilters"
import Empty from "../components/Empty"
import Pagination from "../components/Pagination"

type data = {
    products: IProduct[],
    pageSize: number,
    total: number
}

interface IProductsProps {
    data: data
}

const Products:FC<IProductsProps> = ({ data }: IProductsProps) => {

    const renderProducts = () => {
        if(data.products.length === 0) {
            return <div>
                <Empty />
            </div>
          }
        return (
            <div>
                {data.products.map(p => (
                    <ProductCard key={p._id} product={p}/>
                ))}
                <Pagination total={data.total} pageSize={data.pageSize}/>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[.5fr_1.5fr] gap-5">
            <ProductFilters />
            {renderProducts()}
        </div>
    )
}

export default Products