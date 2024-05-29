import mongoConnect from "@/lib/mongoConnect";
import User from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getSignedinUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email)
            return null

        await mongoConnect()
        const signedinUser = await User.findOne({ email: session.user.email })

        if (!signedinUser)
            return null

        return signedinUser

    } catch (error) {
        return null
    }
}