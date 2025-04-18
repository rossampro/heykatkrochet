import tailwindcss from "@tailwindcss/vite"
import { defineOrganization } from "nuxt-schema-org/schema"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    site: {
        name: 'Hey Kat Krochet'
    },
    schemaOrg: {
        identity: defineOrganization({
            name: "Hey Kat Krochet",
            logo: "/logo.webp"
        })
    },
    seo: {
        meta: {
            title: "Hey Kat Krochet",
            description: "Handmade Crochet Stuffed Animals and Gifts",
            ogTitle: "Hey Kat Krochet",
            ogDescription: "Handmade Crochet Stuffed Animals and Gifts"
        }
    },
    modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/supabase', '@nuxtjs/seo'],
    vite: {
        plugins: [tailwindcss()],
    },
    css: ['~/assets/css/main.css'],
    supabase: {
        redirect: false
    }
})
