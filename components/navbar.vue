<template>
    <div class="navbar bg-secondary">
        <div class="navbar-start">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex space-x-4 navbar-start">
                    <NuxtLink to="/" class="text-2xl font-bold">Home</NuxtLink>
                    <NuxtLink to="/store" class="text-2xl font-bold">Store</NuxtLink>
                </div>
            </div>
        </div>
        <div class="navbar-end">
            <Colorchange />
        </div>
    </div>
</template>
