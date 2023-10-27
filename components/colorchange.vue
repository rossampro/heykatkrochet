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
    <div>
        <select v-model="key" class="select select-md" data-choose-theme>
            <option disabled selected value="">Choose Color Theme</option>
            <option v-for="(theme, index) in themes" :key="index" :value="theme">{{ theme }}</option>
        </select>
    </div>
</template>
