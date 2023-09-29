import axios from 'axios'
import Image from 'next/image'
import Products from '../products/Products'
import Container  from '@/app/components/Container'

const fetchProducts = async() => {
    const { data } = await axios.get("http://localhost:3000/api/products")
    return data
}

export default async function Home() {

  const products = await fetchProducts()

  return (
    <main>
      <Container>
        <Products products={products}/> 
      </Container>
    </main>
  )
}
