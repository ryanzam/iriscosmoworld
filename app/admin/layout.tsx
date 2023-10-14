import axios from "axios"
import getSignedinUser from "../actions/getSignedinUser"
import Empty from "../components/Empty"
import DashboardNav from "../components/dashboard/DashboardNav"

const AdminLayout = async ({children} : any) => {

    const user = await getSignedinUser()
    
    if (!user || user.role !== "admin") {
        return <Empty title="You are unauthorized to access this page" alertClass="alert-warning" />
    }

    return (
        <DashboardNav content={children} admin={user}/>
    )
}

export default AdminLayout