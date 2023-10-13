import getAdminRole from "@/app/actions/getAdminRoles"
import Empty from "@/app/components/Empty"
import OrdersTable from "@/app/components/orders/OrdersTable";
import axios from "axios";

const fetchOrders = async () => {
    const response = await axios.get(`/api/admin/orders`)
    console.log(response)
    return
}

const AdminOrdersPage = async () => {
    const admin = await getAdminRole()

    if (!admin) {
        return <Empty title="You are unauthorized to access this page" alertClass="alert-warning" />
    }

    return (
        <OrdersTable />
    )
}

export default AdminOrdersPage