<script setup>
import { themeChange } from 'theme-change';
import { onMounted } from 'vue';
import { useThemeStore } from '~/stores/themes';

const themeStore = useThemeStore();

const themes = [
    "cupcake",
    "dracula",
    "valentine"
];

onMounted(() => {
    themeChange(false);
    getTheme();
});

const getTheme = () => {
    const theme = themeStore.getTheme;
    localStorage.setItem('theme', theme);
    return theme;
}

</script>
<template>
    <div title="Change Theme" class="dropdown dropdown-end dropdown-hover">
        <div tabindex="0" class="btn normal-case btn-ghost">
            <span class="hidden font-normal md:inline">Theme</span>
            <Icon name="heroicons-outline:arrow-down" />
        </div>
        <div
            class="dropdown-content bg-base-300 text-base-content rounded-box top-px h-[70vh] max-h-32 w-56 overflow-y-auto shadow mt-16">
            <div class="grid grid-cols-1 gap-3 p-3 outline-primary" tabindex="0">
                <button v-for="theme in themes" class="outline-base-content overflow-hidden rounded-lg text-left"
                    :data-set-theme="theme">{{ theme }}</button>
            </div>
        </div>
    </div>
</template>
