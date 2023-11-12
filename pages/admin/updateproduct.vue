<script setup lang="ts">
definePageMeta({
    layout: 'admin-layout',
    middleware: 'admin-auth'
})
import type { IPlushie } from '~/models/plushie';

const { data: plushies, pending, error } = await
    useLazyAsyncData<IPlushie[]>('/api/products', () => {
        return $fetch('/api/products')
    });


</script>
<template>
    <div>
        <div class="flex flex-col m-auto place-items-center">
            <div class="prose text-center underline">
                <h1>Update A Product</h1>
            </div>
        </div>
        <div v-if="pending">
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
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 place-items-center">
            <Updateproductcard v-for="plushie in plushies" :key="plushie.id" :plushie="plushie" />
        </div>
    </div>
</template>
