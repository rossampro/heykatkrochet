import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';

const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: config.authjs.secret,
    // @ts-expect-error
    origin: config.authjs.origin,
    pages: {
        signIn: '/login'
    },
    providers: [
        // @ts-expect-error
        GoogleProvider.default({
            clientId: config.oauth.google.clientId,
            clientSecret: config.oauth.google.clientSecret,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        })
    ]
})
