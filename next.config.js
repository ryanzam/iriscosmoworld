/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'

            }
        ]
    },
    env: {
        BASE_URL: "https://iriscosmoworld.vercel.app",
        NEXTAUTH_URL: "https://iriscosmoworld.vercel.app",
    }
}

module.exports = nextConfig
