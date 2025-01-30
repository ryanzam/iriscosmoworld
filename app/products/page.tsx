import React from 'react'
import Products from './Products'
import { IProductParams } from '../(root)/page'
import { fetchProducts } from '../components/latest/LatestProducts'

const ProductPage = async ({ searchParams }: { searchParams: IProductParams }) => {

  const data = await fetchProducts(searchParams)
  
  return (
    <div>
      <Products data={data}/>
    </div>
  )
}

export default ProductPage