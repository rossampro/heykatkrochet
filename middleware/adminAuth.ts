const userStore = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/' || to.path === '/adminlogin' || to.path === '/store') {
        return;
    };

    if (userStore.isAuthorized == false) {
        return navigateTo('/adminlogin');
    };

    if (userStore.getUserType !== 'admin') {
        return navigateTo('/');
    };
})
