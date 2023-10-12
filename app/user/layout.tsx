import getAdminRole from "../actions/getAdminRoles"
import DashboardNav from "../components/dashboard/DashboardNav"

const UserLayout = async ({children} : any) => {

    const admin = await getAdminRole()

    return (
        <DashboardNav content={children} admin={admin}/>
    )
}

export default UserLayout