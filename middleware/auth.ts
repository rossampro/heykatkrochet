const userStore = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/' || to.path === '/login' || to.path === '/store') {
        return;
    };

    if (userStore.isAuthorized === false) {
        return navigateTo('/login');
    };

    if (userStore.getUserType !== 'admin') {
        return navigateTo('/');
    };
})
