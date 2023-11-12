<script setup lang="ts">
definePageMeta({
    layout: 'admin-layout',
    middleware: 'admin-auth',
    title: "HeyKatKrochet Admin Home"
});
</script>

<template>
    <div>
        <adminwelcome />
    </div>
</template>

