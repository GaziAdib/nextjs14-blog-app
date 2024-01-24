/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'st2.depositphotos.com', 'images.pexels.com'],
    },

    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    }
}

module.exports = nextConfig

