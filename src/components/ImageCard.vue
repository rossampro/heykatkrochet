<script setup>

import ContactCard from './ContactCard.vue';

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
            <div class="card-actions justify-end">
                <button class="btn btn-primary" onclick="contactCard.showModal()">Order Now</button>
                <dialog id="contactCard" class="modal">
                    <div class="modal-box">
                        <ContactCard />
                        <div class="flex flex-col place-items-end">
                            <button class="btn btn-secondary" onclick="contactCard.close()">Close</button>
                        </div>
                    </div>
                </dialog>
            </div>
            <p v-if="plushie.templateCredit"><i>Crochet Design credits to {{ plushie.templateCredit }}</i></p>
        </div>
    </div>
</template>
