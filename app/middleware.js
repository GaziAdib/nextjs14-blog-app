export { default } from 'next-auth/middleware'

export const config = {
    matcher: ["/blogs", "/add-blog", "/update-blog/:path*"],
}