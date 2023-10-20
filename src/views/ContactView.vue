<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const name = ref('')
const email = ref('')
const message = ref('')

function sendEmail(e) {
    const templateParams = {
        name: name.value,
        email: email.value,
        message: message.value
    }
    try {
        e.preventDefault()
        const response = emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        response.then((res) => {
            console.log('SUCCESS!', res.status, res.text)
        })
    } catch (error) {
        console.log(error)
    }

    onReset()
}

function onReset() {
    name.value = ''
    email.value = ''
    message.value = ''
}

</script>

<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col ">
            <div class="prose lg:prose-xl">
                <h1>Contact</h1>
                <p class="py-6">Provide your name and email and what you are interested in ordering. All orders are custom
                </p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form @reset="onReset" class="card-body">
                    <div class="form-control">
                        <input v-model="name" type="text" placeholder="Name" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                        <input v-model="email" type="email" placeholder="Email" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                        <textarea v-model="message" placeholder="Message" class="input input-bordered" required></textarea>
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" type="submit" @click="sendEmail">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
