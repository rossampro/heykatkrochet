<script setup lang="ts">
import type { IPlushie } from '~/models/plushie';

const props = defineProps({})
plushie: {
    type: Object as PropType<IPlushie>,
        required: true,
    },
});

</script>
<template>
    <div class="card w-96 bg-base-300 shadow-2xl">
        <div v-if="imagesPending">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else class="shadow-sm rounded-box h-80">
            <figure>
                <LazyNuxtImg format="webp" :src="getImageUrl(image.name)" :alt="plushie.name" class="w-full" quality="70" />
            </figure>
        </div>
        <div class="card-body">
            <h2 class="card-title">{{ plushie.name }}</h2>
            <div class="flex flex-col">
            </div>
        </div>
    </div>
</template>
