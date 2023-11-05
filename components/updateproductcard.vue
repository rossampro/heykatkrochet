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

const updateRequest = ref<IPlushie>(plushie);


const { data: image, pending: imagePending, error } = await
    useLazyAsyncData<IImage>(`/images/single?productId=${plushie.id}`, () => {
        return $fetch(`/api/images/single?productId=${plushie.id}`);
    });

const { execute, status } = await useLazyFetch('/api/products', {
    method: 'PUT',
    body: updateRequest,
    immediate: false
});

function getAdminImageUrl(name: string): string {
    const imageUrl = new URL(`../assets/images/${name}`, import.meta.url).href;
    return imageUrl
}

</script>
<template>
    <div class="card w-96 bg-base-300 shadow-2xl py-1">
        <div v-if="imagePending">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else class="shadow-sm rounded-box h-96">
            <div v-if="error">
                <div class="alert alert-error">
                    <span>Failed To Load Image</span>
                </div>
            </div>
            <div v-else class="rounded-box h-96 carousel carousel-vertical">
                <figure class="w-full carousel-item">
                    <LazyNuxtImg format="webp" :src="getAdminImageUrl(image.name)" :alt="plushie.name" class="w-full"
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
                    <input type="text" :placeholder="plushie.name" v-model="updateRequest.name"
                        class="input input-bordered w-full max-w-s">
                </div>
                <div v-else>
                    <input type="text" :placeholder="plushie.name" class="input input-bordered w-full max-w-s" disabled>
                </div>

                <label class="label">
                    <span class="label-text">Product Description</span>
                </label>
                <div v-if="isEdit">
                    <input type="text" :placeholder="plushie.description" v-model="updateRequest.description"
                        class="input input-bordered w-full max-w-s" />
                </div>
                <div v-else>
                    <input type="text" :placeholder="plushie.description" class="input input-bordered w-full max-w-s"
                        disabled />
                </div>

                <label class="label">
                    <span v-if="plushie.upperPrice === null" class="label-text">Price</span>
                    <span v-else class="label-text">Lower Price</span>
                </label>
                <div v-if="isEdit">
                    <input type="number" :placeholder="plushie.lowerPrice.toString()"
                        class="input input-bordered w-full max-w-s" v-model="updateRequest.lowerPrice" />
                </div>
                <div v-else>
                    <input type="number" :placeholder="plushie.lowerPrice.toString()"
                        class="input input-bordered w-full max-w-s" disabled />
                </div>

                <div v-if="plushie.upperPrice !== null">
                    <label class="label">
                        <span class="label-text">Upper Price</span>
                    </label>
                    <div v-if="isEdit">
                        <input type="number" :placeholder="plushie.upperPrice.toString()" v-model="updateRequest.upperPrice"
                            class="input input-bordered w-full max-w-s" />
                    </div>
                    <div v-else>
                        <input type="number" :placeholder="plushie.upperPrice.toString()"
                            class="input input-bordered w-full max-w-s" disabled />
                    </div>
                </div>

                <label class="label">
                    <span class="label-text">Product Size(s)</span>
                </label>
                <div v-if="isEdit">
                    <input type="text" :placeholder="plushie.size" class="input input-bordered w-full max-w-s"
                        v-model="updateRequest.size" />
                </div>
                <div v-else>
                    <input type="text" :placeholder="plushie.size" class="input input-bordered w-full max-w-s" disabled />
                </div>

                <label class="label">
                    <span class="label-text">Inventory Left</span>
                </label>
                <div v-if="isEdit">
                    <input type="number" :placeholder="plushie.quantity.toString()"
                        class="input input-bordered w-full max-w-s" v-model="updateRequest.quantity" />
                </div>
                <div v-else>
                    <input type="number" :placeholder="plushie.quantity.toString()"
                        class="input input-bordered w-full max-w-s" disabled />
                </div>

                <label class="label">
                    <span class="label-text">Template Credits</span>
                </label>
                <div v-if="isEdit">
                    <input type="text" :placeholder="plushie.templateCredit" class="input input-bordered w-full max-w-s"
                        v-model="updateRequest.templateCredit" />
                </div>
                <div v-else>
                    <input type="text" :placeholder="plushie.templateCredit" class="input input-bordered w-full max-w-s"
                        disabled />
                </div>
            </form>
        </div>
        <div class="card-actions">
            <div v-if="!isEdit" class="flex flex-col m-auto">
                <button class="btn btn-secondary rounded-btn" @click="isEdit = true">Update?</button>
            </div>
            <div v-else class="flex flex-row m-auto space-x-20">
                <div>
                    <button v-if="status === 'idle'" class="btn btn-secondary rounded-btn"
                        @click="execute(undefined)">Save</button>
                    <button v-else-if="status === 'pending'" class="btn btn-secondary rounded-btn">
                        <span class="loading loading-spinner"></span>
                    </button>
                    <button v-else-if="status === 'success'" class="btn btn-secondary rounded-btn">Done!</button>
                </div>
                <div>
                    <button class="btn btn-error rounded-btn" @click="isEdit = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
