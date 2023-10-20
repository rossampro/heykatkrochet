<script setup>
import { RouterLink } from 'vue-router';

const plushie = defineProps({
    name: String,
    path: String,
    description: String,
    templateCredit: String
});

function getImageUrl(name) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
};

const imageUrl = getImageUrl(plushie.path);

</script>

<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img :src="imageUrl" :alt="plushie.name" class="w-full" /></figure>
        <div class="card-body">
            <h2 class="card-title">{{ plushie.name }}</h2>
            <p>{{ plushie.description }}</p>
            <div class="card-actions justify-center">
                <RouterLink to="/contact" class="btn btn-primary">Order Now</RouterLink>
            </div>
            <p v-if="plushie.templateCredit"><i>Crochet Design credits to {{ plushie.templateCredit }}</i></p>
        </div>
    </div>
</template>
