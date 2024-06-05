import getSignedinUser from "../actions/getSignedinUser"
import Empty from "../components/Empty"
import DashboardNav from "../components/dashboard/DashboardNav"

const AdminLayout = async ({ children }: any) => {

    const user = await getSignedinUser()

    if (!user || user.role !== "admin") {
        return <div className="xs:mt-3">
            <Empty title="You are unauthorized to access this page" alertClass="alert-warning" />
        </div>
    }

    return (
        <DashboardNav content={children} admin={user} />
    )
}

export default AdminLayout