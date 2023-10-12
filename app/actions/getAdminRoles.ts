import getSignedinUser from "./getSignedinUser";

export default async function getAdminRole() {
    const user = await getSignedinUser()
    
    return user?.role === "admin" ? user : false  
}