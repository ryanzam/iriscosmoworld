import getSignedinUser from "../actions/getSignedinUser"
import DashboardNav from "../components/dashboard/DashboardNav"

const UserLayout = async ({children} : any) => {

    const user = await getSignedinUser()

    const admin = user?.role === "admin"

    return (
        <DashboardNav content={children} admin={admin}/>
    )
}

export default UserLayout