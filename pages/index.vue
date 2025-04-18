<script setup lang="ts">
const heroText = {
    title: "Handcrafted Crochet Creations",
    subtitle: "Unique, beautiful, and made with love",
    description: "Welcome to my world of crochet art. Each piece is carefully crafted with attention to detail and a passion for the craft."
}

defineOgImageScreenshot()
</script>

<template>
    <section class="hero min-h-[80vh] flex items-center justify-center py-16">
        <div class="hero-content max-w-6xl mx-auto px-4 flex flex-col items-center">
            <!-- Logo and Title Row -->
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                <NuxtImg src="/logo.webp" alt="Hey Kat Krochet Logo" width="200" height="200" class="w-48 h-48" />
                <div class="text-center md:text-left">
                    <h1 class="text-5xl font-bold text-primary-content">{{ heroText.title }}</h1>
                    <h2 class="text-2xl text-primary-content mt-2">{{ heroText.subtitle }}</h2>
                </div>
            </div>

            <!-- View Gallery Button -->
            <div class="mt-8">
                <NuxtLink to="/gallery" class="btn btn-accent btn-lg">View Gallery</NuxtLink>
            </div>
            <div class="mt-8">
                <NuxtLink to="https://www.instagram.com/heykatkrochet" class="btn btn-accent btn-lg">Contact Me
                </NuxtLink>
            </div>
        </div>
    </section>

    <section class="py-16 bg-base-200">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-primary">Featured Works</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="card bg-base-100 shadow-xl">
                    <figure class="px-4 pt-4">
                        <NuxtImg
                            src="https://ghxydxayxhgjliaithlf.supabase.co/storage/v1/object/public/images/IMG_6719.webp"
                            alt="Featured Item 1" class="rounded-xl" width="600" height="400" />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title">Featured Creation</h3>
                        <p>Fall flavored pumpkin and kitty kat</p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure class="px-4 pt-4">
                        <NuxtImg
                            src="https://ghxydxayxhgjliaithlf.supabase.co/storage/v1/object/public/images/Peapod.webp"
                            alt="Featured Item 2" class="rounded-xl" width="600" height="400" />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title">Latest Creation</h3>
                        <p>Like two peas in a pod</p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure class="px-4 pt-4">
                        <NuxtImg
                            src="https://ghxydxayxhgjliaithlf.supabase.co/storage/v1/object/public/images/IMG_7782.webp"
                            alt="Featured Item 3" class="rounded-xl" width="600" height="400" />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title">Customer Favorite</h3>
                        <p>Feeling festive with this reindeer</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
