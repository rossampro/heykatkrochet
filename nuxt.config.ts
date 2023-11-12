// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },
    app: {
        head: {
            title: 'HeyKat Krochet'
        },
        layoutTransition: {
            name: 'layout',
            mode: 'in-out'
        }
    },
    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
        'nuxt-icon',
        "@unlok-co/nuxt-stripe",
        "@sidebase/nuxt-auth"
    ],
    runtimeConfig: {
        turso: {
            dbUrl: '',
            dbAuthToken: '',
        },
        stripe: {
            secretKey: ''
        },
        oauth: {
            google: {
                clientId: '',
                clientSecret: ''
            }
        }
    },
    auth: {
        provider: {
            type: 'authjs'
        }
    }
})
