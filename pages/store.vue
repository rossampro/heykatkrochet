<script setup lang="ts">
import type { IPlushie } from '~/models/plushie';

definePageMeta({
    title: "HeyKatKrochet Store"
});

const { data: plushies, pending } = await useLazyAsyncData<IPlushie[]>('plushies', () => {
    return $fetch('/api/products');
});

</script>
<template>
    <div>
        <h1 class="flex flex-col place-items-center m-auto text-5xl underline">Store</h1>
        <div v-if="!pending"
            class="grid grid-cols-1 md:grid-cols-3 carousel md:carousel-vertical md:items-center rounded-box place-items-center">
            <Imagecard class="carousel-item" v-for="plushie in plushies" :key="plushie.id" :plushie="plushie" />
        </div>
        <div v-else>
            <div class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row">
                    <div class="prose text-center">
                        <h1>Loading Products &#129526;</h1>
                    </div>
                    <span class="loading loading-ball loading-xs"></span>
                    <span class="loading loading-ball loading-sm"></span>
                    <span class="loading loading-ball loading-md"></span>
                    <span class="loading loading-ball loading-lg"></span>
                </div>
            </div>
        </div>
    </div>
</template>
