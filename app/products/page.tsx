import React from 'react'
import Products from './Products'
import { fetchProducts, IProductParams } from '../(root)/page'

const ProductPage = async ({ searchParams }: { searchParams: IProductParams }) => {

  const data = await fetchProducts(searchParams)
  
  return (
    <div>
      <Products data={data}/>
    </div>
  )
}

export default ProductPage