<script setup lang="ts">
import type { PropType } from 'vue';
import type { IPlushie } from '../models/plushie';
const props = defineProps({
    plushie: {
        type: Object as PropType<IPlushie>,
        required: true
    }
});

const plushie = props.plushie;

function getImageUrl(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
};

const imageUrl = getImageUrl(plushie.image);
</script>

<template>
    <div class="card w-96 bg-base-300 shadow-2xl">
        <figure>
            <LazyNuxtImg :src="imageUrl" :alt="plushie.name" class="w-full" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ plushie.name }}</h2>
            <div class="flex flex-col">
                <p>{{ plushie.description }}</p>
                <p>Price: {{ plushie.price }}</p>
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
