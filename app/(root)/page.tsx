import axios from 'axios'
import Products from '../products/Products'
import Footer from '../components/footer/Footer';
import { PROD_URL } from '@/utils/constants';

interface IParams {
  search?: string;
  ratings?: string;
  category?: string;
  min?: number;
  max?: number;
  page?: number;
}

export const fetchProducts = async (params: IParams) => {
  const { data } = await axios.get(`${PROD_URL}/api/products`, { params })
  return data
}

export default async function Home({ searchParams }: { searchParams: IParams }) {
  
  const data = await fetchProducts(searchParams)

  return (
    <div className='mt-1'>
      <Products data={data} />
    </div>
  )
}
