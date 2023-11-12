<script setup lang="ts">
import { useUserStore } from '~/stores/usersession';
definePageMeta({
    title: "HeyKatKrochet Admin Login"
})


const userStore = useUserStore();

const email = ref('');
const password = ref('');

const { data, execute, error, status } = await useLazyFetch('/api/adminlogin', {
    method: 'POST',
    immediate: false,
    watch: false,
    body: {
        email: email,
        password: password
    }
})

watch(data, () => {
    if (data.value?.userType === 'admin') {
        userStore.login(data.value.userType);
        navigateTo('/admin/home');
    };
})


</script>
<template>
    <div>
        <div v-if="error">
            <h1>{{ JSON.stringify(error) }}</h1>
        </div>
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
                        <div class="form-control mt-6" v-if="status === 'idle'">
                            <button class="btn btn-primary" @click="execute()">Login</button>
                        </div>
                        <div class="form-control mt-6" v-else-if="status === 'pending'">
                            <button class="btn btn-primary loading loading-spinner"></button>
                        </div>
                        <div class="form-control mt-6" v-else-if="status === 'error'">
                            <button class="btn btn-primary">{{ error }}</button>
                        </div>
                        <div class="form-control mt-6" v-else-if="status === 'success'">
                            <button class="btn btn-primary btn-disabled">Yay</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
