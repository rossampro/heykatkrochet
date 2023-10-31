export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthorized: false,
        userType: '',
    }),

    getters: {
        getIsAuthorized: (state) => state.isAuthorized,
        getUserType: (state) => state.userType,
    },

    actions: {
        login(userType: string) {
            this.isAuthorized = true;
            this.userType = userType;
        },
        logout() {
            this.$reset();
        }
    }
})
