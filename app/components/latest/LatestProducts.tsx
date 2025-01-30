import { IProductParams } from '@/app/(root)/page'
import { IProduct } from '@/models/product'
import { PROD_URL } from '@/utils/constants'
import axios from 'axios'
import React from 'react'
import ProductCard from '../products/ProductCard'

export const fetchProducts = async (params: IProductParams) => {
    const { data } = await axios.get(`${PROD_URL}/api/products`, { params })
    return data
}

const LatestProducts = async () => {

    const data = await fetchProducts({})

    return (
        <div className="grid grid-cols-4 gap-x-5 xs:grid-cols-1">
            {data.products.slice(-4).map((p: IProduct) => (
                <ProductCard key={p._id} product={p} />
            ))}
        </div>
    )
}

export default LatestProducts