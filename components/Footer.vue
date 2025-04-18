<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
    <nav class="grid grid-flow-col gap-4">
      <NuxtLink to="/" class="link link-hover">Home</NuxtLink>
      <NuxtLink to="/gallery" class="link link-hover">Gallery</NuxtLink>
    </nav> 
    <aside>
      <p>Copyright © {{ currentYear }} - Hey Kat Krochet</p>
    </aside>
  </footer>
</template> 