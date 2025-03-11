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
    <div className=''>
      <hr className='my-3' />
      <LatestProducts />
    </div>
  )
}
