<script setup lang="ts">
import type { PropType } from 'vue';
import type { IPlushie } from '../models/plushie';
import type { IImage } from '~/models/images';
const props = defineProps({
    plushie: {
        type: Object as PropType<IPlushie>,
        required: true
    }
});

const plushie = props.plushie;

const { data: images, pending: imagesPending } = await
    useLazyAsyncData<IImage[]>(`/api/images/${plushie.id}`, () => {
        return $fetch(`/api/images?productId=${plushie.id}`);
    })
</script>

<template>
    <div class="card w-96 bg-base-300 shadow-2xl">
        <div v-if="imagesPending">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else class="carousel carousel-vertical rounded-box h-96">
            <figure v-for="image in images" class="carousel-item w-full" :key="image.id">
                <LazyNuxtImg format="webp" :src="getImageUrl(image.name)" :alt="plushie.name" class="w-full" quality="70" />
            </figure>
        </div>
        <div class="card-body">
            <h2 class="card-title">{{ plushie.name }}</h2>
            <div class="flex flex-col">
                <p>{{ plushie.description }}</p>
                <div v-if="plushie.upperPrice !== null">
                    <p>Price Range: ${{ plushie.lowerPrice }}-${{ plushie.upperPrice }}</p>
                </div>
                <div v-else>
                    <p>Price: ${{ plushie.lowerPrice }}</p>
                </div>
                <p>Size: {{ plushie.size }}</p>
                <p>Inventory Left: {{ plushie.quantity }}</p>
            </div>
            <div class="card-actions justify-center">
                <button class="btn btn-primary">Buy</button>
            </div>
            <p v-if="plushie.templateCredit"><i>Crochet Design credits to {{ plushie.templateCredit }}</i></p>
        </div>
    </div>
</template>
