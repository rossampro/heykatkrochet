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
    ],
    runtimeConfig: {
        turso: {
            dbUrl: '',
            dbAuthToken: '',
        }
    }
})
