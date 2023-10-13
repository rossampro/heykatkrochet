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
  <div class="flex flex-shrink flex-col place-items-center m-auto">
    <h1 class="prose underline">Contact Me</h1>
    <form @reset="onReset" class="flex flex-col">
      <div>
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="form-input px-4 py-3 rounded-full"
        />
      </div>
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-input px-4 py-3 rounded-full"
        />
      </div>
      <div>
        <textarea
          v-model="message"
          placeholder="Message"
          class="form-textarea px-4 py-3"
        ></textarea>
      </div>
      <div class="grid">
        <button class="btn btn-primary" type="submit" @click="sendEmail">Submit</button>
      </div>
    </form>
  </div>
</template>
