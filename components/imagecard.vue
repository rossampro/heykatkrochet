<script setup lang="ts">
import { PropType } from 'vue';
import type { IPlushie } from '../models/plushie';
const props = defineProps({
    plushie: {
        type: Object as PropType<IPlushie>,
        required: true
    }
});

const plushie = props.plushie;

function getImageUrl(name: string) {
    return new URL(`../assets/${name}.jpg`, import.meta.url).href;
};

const imageUrl = getImageUrl(plushie.image);
</script>

<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
            <NuxtImg :src="imageUrl" :alt="plushie.name" />
        </figure>
        <div class="card-body prose">
            <h2 class="card-title"></h2>
        </div>
    </div>
</template>
