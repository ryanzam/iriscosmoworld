import axios from 'axios'
import Products from '../products/Products'

const fetchProducts = async () => {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/products`)
  return data
}

export default async function Home() {

  const products = await fetchProducts()

  return (
    <main>
      <Products products={products} />
    </main>
  )
}
