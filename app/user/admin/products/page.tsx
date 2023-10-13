import { fetchProducts } from "@/app/(root)/page"
import getAdminRole from "@/app/actions/getAdminRoles"
import Empty from "@/app/components/Empty"
import ProductsTable from "@/app/components/products/ProductsTable"

interface IParams {
    page?: number;
}

const AdminProductsPage = async ({ searchParams }: { searchParams : IParams}) => {

    const admin = await getAdminRole()

    if(!admin) {
        return <Empty title="You are unauthorized to access this page" alertClass="alert-warning"/>
    }

    const data = await fetchProducts(searchParams);

    return (
        <ProductsTable data={data}/>
    )
}

export default AdminProductsPage