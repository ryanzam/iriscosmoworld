import { fetchProducts } from "@/app/components/latest/LatestProducts";
import ProductsTable from "@/app/components/products/ProductsTable"

export interface IParams {
    page?: number;
}

const AdminProductsPage = async ({ searchParams }: { searchParams : IParams}) => {

    const data = await fetchProducts(searchParams);

    return (
        <ProductsTable data={data}/>
    )
}

export default AdminProductsPage