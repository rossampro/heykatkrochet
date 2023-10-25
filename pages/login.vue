<script setup>
const supabase = useSupabaseClient();
const email = ref('');

const signInWithOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
            emailRedirectTo: 'http://localhost:3000/confirm',
        }
    })
    if (error) {
        console.log(error)
    }
};

</script>

<template>
    <div>
        <input type="email" v-model="email" />
        <button @click="signInWithOtp">Sign in with OTP</button>
    </div>
</template>
