<script setup lang="ts">
import type { LoginCredentials, LoginResponse } from '~/models/authentication';
import { useUserStore } from '~/stores/usersession';


const userStore = useUserStore();

const email = ref('');
const password = ref('');

const { execute, status } = await useLazyAsyncData(`/api/login${Date.now()}`, async () => {
    const body: LoginCredentials = {
        email: email.value,
        password: password.value,
    };
    const response = await $fetch<LoginResponse>('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    });

    if (response.userType == 'admin') {
        userStore.login(response.userType);
        navigateTo('/admin/home');
    } else {
        alert('Invalid user');
        throw new Error('Invalid user');
    }

}, {
    immediate: false,
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
                            <button class="btn btn-primary" @click="execute(undefined)">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
