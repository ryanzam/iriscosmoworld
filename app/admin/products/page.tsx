import { fetchProducts } from "@/app/(root)/page"
import ProductsTable from "@/app/components/products/ProductsTable"

interface IParams {
    page?: number;
}

const AdminProductsPage = async ({ searchParams }: { searchParams : IParams}) => {

    const data = await fetchProducts(searchParams);

    return (
        <ProductsTable data={data}/>
    )
}

export default AdminProductsPage