<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="navbar bg-secondary">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex space-x-4">
                    <RouterLink to="/" class="text-2xl font-bold">Home</RouterLink>
                    <RouterLink to="/about" class="text-2xl font-bold">About</RouterLink>
                    <RouterLink to="/store" class="text-2xl font-bold">Store</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
