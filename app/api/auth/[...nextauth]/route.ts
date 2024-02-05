import { log } from "console"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { text } from "stream/consumers"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentails',
            credentials: {
                username: { lable: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch('https://www.melivecode.com/api/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                })
                const response = await res.json()
                console.log(response);
                
                if (response.status === 'ok') {
                    response.user.image = response.user.avatar
                    response.user.name = response.user.fname
                    return response.user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    }

})

export { handler as GET, handler as POST }