<script setup lang="ts">
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
]
</script>

<template>
  <div class="navbar bg-base-100 shadow-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="item in navigation" :key="item.name">
            <NuxtLink :to="item.href">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl">Hey Kat Krochet</NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="item in navigation" :key="item.name">
          <NuxtLink :to="item.href">{{ item.name }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template> 