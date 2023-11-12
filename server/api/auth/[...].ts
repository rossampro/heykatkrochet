import { NuxtAuthHandler } from '#auth';
import GoogleProfile from 'next-auth/providers/google';

const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: config.authjs.secret,
    pages: {
        signIn: '/login'
    },
    providers: [
        // @ts-expect-error
        GoogleProfile.default({
            clientId: config.oauth.google.clientId,
            clientSecret: config.oauth.google.clientSecret
        })
    ]
})
