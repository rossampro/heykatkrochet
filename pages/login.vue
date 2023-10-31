<script setup lang="ts">

const email = ref('');
const password = ref('');

const { execute, status } = await useFetch('/api/login', {
    method: 'POST',
    baseURL: '/api/login',
    immediate: false,
    watch: false,
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        email: email,
        password: password
    },
});

</script>
<template>
    <div>
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Admin Login</h1>
                    <p class="py-6"></p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" class="input input-bordered" required v-model="email" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" class="input input-bordered" required
                                v-model="password" />
                            <label class="label">
                                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary" @click="execute">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
