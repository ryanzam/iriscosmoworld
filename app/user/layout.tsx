import DashboardNav from "../components/dashboard/DashboardNav"

const UserLayout = ({children} : any) => {
    return (
        <DashboardNav content={children} />
    )
}

export default UserLayout