<script setup>

const plushie = defineProps({
    name: String,
    path: String,
    description: String,
    templateCredit: String
});

</script>

<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img :src="plushie.path" :alt="plushie.name" /></figure>
        <div class="card-body">
            <h2 class="card-title">{{ plushie.name }}</h2>
            <p>{{ plushie.description }}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Order Now</button>
            </div>
            <p v-if="plushie.templateCredit">Crochet Design credits to {{ plushie.templateCredit }}</p>
        </div>
    </div>
</template>
