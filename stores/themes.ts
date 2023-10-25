export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: 'cupcake',
    }),

    getters: {
        getTheme: (state) => state.theme,
    },
    actions: {
        setTheme(theme: string): string {
            this.theme = theme;
            return this.theme;
        }
    }
})
