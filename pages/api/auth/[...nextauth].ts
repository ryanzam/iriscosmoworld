import mongoConnect from "@/lib/mongoConnect";
import User from "@/models/user";
import nextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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

                mongoConnect()

                const { email, password } = credentials
                const user = await User.findOne({ email }).select("+password")

                if (!user || !user?.password)
                    throw new Error("Invalid credentials")

                const isValidPassword = await bcrypt.compare(password, user.password)

                if (!isValidPassword)
                    throw new Error("Incorrect credentials")

                return user
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token
        },
        async session({ session, token }) {
            const user: any = token.user
            const { __v, password, ...rest } = user
            session.user = rest
            return session
        }
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


