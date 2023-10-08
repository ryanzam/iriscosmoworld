import getSignedinUser from "../actions/getSignedinUser"
import User from "../components/user/User"


const UserPage = async () => {

    const signedinUser = await getSignedinUser()

    return <User user={signedinUser}/>
}

export default UserPage