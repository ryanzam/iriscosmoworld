import getAdminRole from "@/app/actions/getAdminRoles"
import Empty from "@/app/components/Empty"
import Table from "@/app/components/tables/Table"

const AdminProductsPage = async () => {

    const admin = await getAdminRole()

    if(!admin) {
        return <Empty title="Unauthorized User" alertClass="alert-warning "/>
    }

    return (
        <Table />
    )
}

export default AdminProductsPage