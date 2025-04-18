<script setup lang="ts">
import type { GalleryImage } from '~/types/gallery'

defineOgImageScreenshot()

const { data: images, error } = await useFetch<GalleryImage[]>('/api/gallery')

// Fallback to placeholder images if there's an error or no data
const displayImages = computed<GalleryImage[]>(() => {
    if (error.value || !images.value) {
        return [
            {
                id: '1',
                url: 'https://placehold.co/600x400'
            },
            {
                id: '2',
                url: 'https://placehold.co/600x400'
            }
        ]
    }
    return images.value
})
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-primary">Gallery</h1>
        <div class="gallery-grid">
            <div v-for="image in displayImages" :key="image.id" class="card bg-base-100 shadow-xl">
                <figure>
                    <NuxtImg :src="image.url" class="rounded-xl" width="600" height="600" loading="lazy"
                        alt="Gallery image" />
                </figure>
            </div>
        </div>
    </div>
</template>
