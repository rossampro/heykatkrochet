<script setup lang="ts">

const { status, signOut, data } = useAuth();

const logOut = (e: Event) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
}

</script>
<template>
    <div class="navbar bg-secondary">
        <div class="navbar-start">
            <div class="dropdown dropdown-hover">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <ul tabindex="0" class="men menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NuxtLink to="/" class="text-lg link">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/store" class="text-lg link">Store</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-center">
            <NuxtLink to="/" class="btn btn-ghost normal-case">HeyKat Krochet</NuxtLink>
        </div>
        <div class="navbar-end">
            <span v-if="status === 'authenticated'">Hello {{ data?.user?.name }}</span>
            <Shoppingcart />
            <Colorchange />
            <NuxtLink v-if="status !== 'authenticated'" to="/login" class="btn normal-case">Login</NuxtLink>
            <button v-else class="btn normal-case" @click="logOut">Logout</button>
        </div>
    </div>
</template>
