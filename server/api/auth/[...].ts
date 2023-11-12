import { NuxtAuthHandler } from '#auth';
import GoogleProfile from 'next-auth/providers/google';

const config = useRuntimeConfig().oauth;

export default NuxtAuthHandler({
    providers: [
        // @ts-expect-error
        GoogleProfile.default({
            clientId: config.google.clientId,
            clientSecret: config.google.clientSecret
        })
    ]
})
