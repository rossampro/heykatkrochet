<script setup lang="ts">
import type { IImage } from '~/models/images';
import type { IPlushie } from '~/models/plushie';

const isEdit = ref(false);

const props = defineProps({
    plushie: {
        type: Object as PropType<IPlushie>,
        required: true,
    },
});

const plushie = props.plushie;

const updateRequest = ref<IPlushie>();
updateRequest.value = plushie;


const { data: imageResponse, pending: imagePending, error } = await
    useLazyAsyncData<IImage>(`/images/single?productId=${plushie.id}`, () => {
        return $fetch(`/api/images/${plushie.id}`);
    });

const image = watch(imageResponse, () => {
    if (imageResponse.value !== null) {
        return imageResponse.value
    }
});

const { execute, status } = await useLazyFetch('/api/products', {
    method: 'PUT',
    body: updateRequest,
    immediate: false
});

</script>
<template>
    <div class="card w-96 bg-base-300 shadow-2xl">
        <div v-if="imagePending">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else class="shadow-sm rounded-box h-80">
            <div v-if="error">
                <div class="alert alert-error">
                    <span>Failed To Load Image</span>
                </div>
            </div>
            <div v-else>
                <figure>
                    <LazyNuxtImg format="webp" :src="getImageUrl(image.name)" :alt="plushie.name" class="w-full"
                        quality="70" />
                </figure>
            </div>
        </div>
        <div class="card-body">
            <form class="form-control prose">
                <label class="label">
                    <span class="label-text">Product Name</span>
                </label>
                <div v-if="isEdit">
                    <input type="text" :placeholder="updateRequest?.name" v-model="updateRequest?.name"
                        class="input input-bordered w-full max-w-s">
                </div>
                <div v-else>
                    <input type="text" :placeholder="updateRequest?.name" v-model="updateRequest?.name"
                        class="input input-bordered w-full max-w-s" disabled>
                </div>

                <label class="label">
                    <span class="label-text">Product Description</span>
                </label>
                <div v-if="isEdit">
                    <input type="text" :placeholder="updateRequest?.description" v-model="updateRequest?.description"
                        class="input input-bordered w-full max-w-s" />
                </div>
                <div v-else>
                    <input type="text" :placeholder="updateRequest?.description" v-model="updateRequest?.description"
                        class="input input-bordered w-full max-w-s" disabled />
                </div>
            </form>
        </div>
        <div class="card-actions">
            <div v-if="!isEdit">
                <button class="btn btn-secondary rounded-btn" @click="isEdit = true">Update?</button>
            </div>
            <div v-else>
                <button v-if="status === 'idle'" class="btn btn-secondary rounded-btn"
                    @click="execute(undefined)">Save</button>
                <button v-else-if="status === 'pending'" class="btn btn-secondary rounded-btn">
                    <span class="loading loading-spinner"></span>
                </button>
                <button v-else-if="status === 'success'" class="btn btn-secondary rounded-btn">Done!</button>
                <button class="btn btn-error rounded-btn" @click="isEdit = false">Cancel</button>
            </div>
        </div>
    </div>
</template>
