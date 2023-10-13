<script setup>
import ImageCard from '../components/ImageCard.vue';
import plushies from '../inventory/inventory';
</script>

<template>
    <div>
        <h1 class="flex flex-col place-items-center text-black m-auto text-5xl underline">Store</h1>
        <div class="grid grid-cols-3 carousel rounded-box place-items-center">
            <ImageCard class="carousel-item" v-for="plushie in plushies" :key="plushie.id" :name="plushie.name"
                :path="plushie.path" :description="plushie.description" :templateCredit="plushie.templateCredit" />
        </div>
    </div>
</template>
