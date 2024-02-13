import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";


const prisma = new PrismaClient();

export const authOptions = {
    session: {
        strategy: "jwt", //(1)
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: "email",
                },
                password: {
                    label: 'password',
                    type: "password",
                }
            },
            // callbackUrl: '/',
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },

                });

                console.log('User', user)

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials?.password, user?.password
                )

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    permissions: user?.permissions
                }

            }
        })
    ],

    pages: {
        signIn: '/login', //(4) custom signin page path
    },

    callbacks: {
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.

            console.log('session---', token)

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    email: token.email,
                    role: token.role,
                    permissions: token?.permissions
                }
            }
        },

        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin

            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    permissions: user?.permissions
                }
            }

            return token

        }

    },
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET


};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

//export const getServerAuthSession = () => getServerSession(options); //(6) 
