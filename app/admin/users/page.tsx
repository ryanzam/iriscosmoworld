import UsersTable from "@/app/components/user/UsersTable"
import axios from "axios"

interface IParams {
    page?: number;
}

const AdminUserPage = async ({ searchParams }: { searchParams: IParams }) => {

    return (
        <UsersTable  />
    )
}

export default AdminUserPage