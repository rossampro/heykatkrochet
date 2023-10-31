<script setup lang="ts">
import type { IPlushiePost } from '~/models/plushie';

const productName = ref('');
const productDescription = ref('');
const lowerPrice = ref(0);
const upperPrice = ref(0);
const productSize = ref('');
const productQuanity = ref(0);
const templateCredit = ref('');

const { execute, status } = await useLazyFetch('/api/products', {
    method: 'POST',
    immediate: false,
    headers: {
        'Content-Type': 'application/json',
    },
    body: () => {
        const product: IPlushiePost = {
            name: productName.value,
            description: productDescription.value,
            lowerPrice: lowerPrice.value,
            upperPrice: upperPrice.value,
            size: productSize.value,
            quantity: productQuanity.value,
            templateCredit: templateCredit.value,
        };
        return product;
    }
})


</script>
<template>
    <div>
        <div class="card w-fit bg-base-300 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Create Product</h2>
                <p>In the form below add the details for the product and upload an image (or multiple)</p>
                <div>
                    <form class="form-control prose">
                        <label class="label">
                            <span class="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="Product Name" class="input input-bordered w-full max-w-s"
                            v-model="productName" required />

                        <label class="label">
                            <span class="label-text">Product Description</span>
                        </label>
                        <input type="text" placeholder="Description" class="input input-bordered w-full max-w-s"
                            v-model="productDescription" required>

                        <label class="label">
                            <span class="label-text">Product Price (lower price if range)</span>
                        </label>
                        <input type="number" class="input input-bordered w-full max-w-s" v-model="lowerPrice" required>

                        <label class="label">
                            <span class="label-text">Upper Price (optional, only provide if there is a price range)</span>
                        </label>
                        <input type="number" class="input input-bordered w-full max-w-s" v-model="upperPrice" required>

                        <label class="label">
                            <span class="label-text">Product Size</span>
                            <span class="label-text-alt">i.e. small, medium, large, or various</span>
                        </label>
                        <input type="text" placeholder="Size" class="input input-bordered w-full max-w-s"
                            v-model="productSize" required>

                        <label class="label">
                            <span class="label-text">Product Quantity</span>
                            <span class="label-text-alt">How many of this product have you made?</span>
                        </label>
                        <input type="number" class="input input-bordered w-full max-w-s" v-model="productQuanity" required>

                        <label class="label">
                            <span class="label-text">Template Credits</span>
                            <span class="label-text-alt">If you didn't make this template, provide the name credits
                                below</span>
                        </label>
                        <input type="text" placeholder="Template Credits" class="input input-bordered w-full max-w-s"
                            v-model="templateCredit">
                    </form>
                </div>
                <div v-if="status === 'idle'" class="card-actions justify-end">
                    <button class="btn btn-primary" @click="execute">Submit</button>
                </div>

                <div v-else-if="status === 'pending'">
                    <button class="btn btn-primary loading loading-spinner"></button>
                </div>

                <div v-else-if="status === 'success'">
                    <button class="btn btn-primary">Done!</button>
                </div>
            </div>
        </div>
    </div>
</template>
