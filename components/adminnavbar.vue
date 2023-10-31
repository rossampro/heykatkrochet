<script setup lang="ts">

</script>
<template>
    <div class="navbar bg-secondary">
        <div class="navbar-start">
            <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                <li>
                    <NuxtLink to="/admin/home" class="link link-hover">Admin Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/create" class="link link-hover">Create Product</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/update" class="link link-hover">Update Product</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
