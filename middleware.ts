export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/user",
        "/delivery",
        "/checkout",
        "/user/admin/:path*"
    ]
}