<script setup lang="ts">
import type { IPlushie } from '~/models/plushie';

const { data, pending, error } = await
    useLazyAsyncData<IPlushie[]>('/api/products', () => {
        return $fetch('/api/products')
    })
</script>
<template>
    <div>

    </div>
</template>
