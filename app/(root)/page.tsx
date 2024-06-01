import axios from 'axios'
import Products from '../products/Products'
import Footer from '../components/footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';

interface IParams {
  search?: string;
  ratings?: string;
  category?: string;
  min?: number;
  max?: number;
  page?: number;
}

export const fetchProducts = async (params: IParams) => {
  const { data } = await axios.get(`https://iriscosmoworld.vercel.app/api/products`, { params })
  return data
}

const ErrorTemplate = () => {
  return <div role="alert" className="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Error! Something went wrong.</span>
  </div>
}

export default async function Home({ searchParams }: { searchParams: IParams }) {

  const data = await fetchProducts(searchParams)

  return (
    <ErrorBoundary fallback={ErrorTemplate()}>
      <Products data={data} />
      <Footer />
    </ErrorBoundary>
  )
}
