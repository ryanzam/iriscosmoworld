import CategoryCard from '../components/categories/Categories';
import LatestProducts from '../components/latest/LatestProducts';

export interface IProductParams {
  search?: string;
  ratings?: string;
  category?: string;
  min?: number;
  max?: number;
  page?: number;
}

export default async function Home({ searchParams }: { searchParams: IProductParams }) {

  return (
    <div>
      <div className=''>
        <hr className='my-3' />
        <LatestProducts />
      </div>

      <div>
        <h3 className='uppercase font-bold mt-10 mb-2'>Explore Categories</h3>
        <hr className='my-3' />
        <CategoryCard />
      </div>
    </div>
  )
}
