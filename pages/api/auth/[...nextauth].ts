import mongoConnect from "@/lib/mongoConnect";
import User from "@/models/user";
import nextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

mongoConnect()

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password)
                    throw new Error("Invalid credentials")

                const { email, password } = credentials
                const user = await User.findOne({ email }).select("+password")

                if (!user || !user?.password)
                    throw new Error("Invalid credentials")

                const isValidPassword = await bcrypt.compare(password, user.password)

                if (!isValidPassword)
                    throw new Error("Incorrect credentials")

                if(!user.emailVerified)
                    return redirect(`${process.env.BASE_URL}/signin`)

                return user
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

            if (trigger === "update" && session?.email) {
                token.email = session.email;
            }
            user && (token.user = user);
            return token
        },
        async session({ session, token }) {
            const user: any = token.user
            const { __v, password, ...rest } = user
            session.user = rest
            return session
        },
        async signIn({ user, account, profile }) {
            const name = profile?.name
            const email = profile?.email
            const userFound = await User.findOne({ email });

            if (userFound) {
                toast("Welcome back, " + userFound?.name)
                return true
            }

            if (account?.provider === 'google') {
                const usr = new User({
                    name,
                    email: profile?.email,
                    role: "user"
                });
                await usr.save()
                toast("Welcome " + userFound?.name)
                return true
            }
            if (account?.provider === 'credentials' && Object.keys(user).length > 0) {
                toast("Welcome back, " + userFound?.name)
                return true
            }
            return false
        },
    },
    pages: {
        signIn: "/signin"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    }
}

export default nextAuth(authOptions)


