/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },
    env: {
        BASE_URL: process.env.NODE_ENV === "Production" ? "https://iriscosmoworld.vercel.app" : "http://localhost:3000",
        NEXTAUTH_URL: process.env.NODE_ENV === "Production" ? "https://iriscosmoworld.vercel.app" : "http://localhost:3000",
    }
}

module.exports = nextConfig
