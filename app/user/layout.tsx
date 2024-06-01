import { redirect } from "next/navigation"
import getSignedinUser from "../actions/getSignedinUser"
import DashboardNav from "../components/dashboard/DashboardNav"

const UserLayout = async ({children} : any) => {

    const signedinUser = await getSignedinUser()

    if(!signedinUser) {
        redirect(`/signin`)
    }

    const admin = signedinUser?.role === "admin"

    return (
        <DashboardNav content={children} admin={admin}/>
    )
}

export default UserLayout