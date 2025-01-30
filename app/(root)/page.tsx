import axios from 'axios'
import { PROD_URL } from '@/utils/constants';
import ProductCard from '../components/products/ProductCard';
import { IProduct } from '@/models/product';
import CategoryCard from '../components/categories/Categories';

export interface IProductParams {
  search?: string;
  ratings?: string;
  category?: string;
  min?: number;
  max?: number;
  page?: number;
}

export const fetchProducts = async (params: IProductParams) => {
  const { data } = await axios.get(`${PROD_URL}/api/products`, { params })
  return data
}

export default async function Home({ searchParams }: { searchParams: IProductParams }) {

  const data = await fetchProducts(searchParams)

  return (
    <div>
      <div className=''>
        <hr className='my-3' />
        <div className="grid grid-cols-4 gap-x-5 xs:grid-cols-1">
          {data.products.slice(-4).map((p: IProduct) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>

      <div>
        <h3 className='uppercase font-bold mt-10 mb-2'>Explore Categories</h3>
        <hr className='my-3' />
        <CategoryCard />
      </div>
    </div>
  )
}
