import axios from 'axios'
import Products from '../products/Products'

interface IParams {
  search?: string;
  ratings?: string;
  category?: string;
  min?: number;
  max?: number;
  page?: number;
}

const fetchProducts = async (params: IParams) => {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/products`, { params })
  return data
}

export default async function Home({ searchParams }: { searchParams : IParams}) {

  const data = await fetchProducts(searchParams);

  return (
    <main>
      <Products data={data} />
    </main>
  )
}
