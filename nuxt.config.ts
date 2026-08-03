// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  modules: ['@pinia/nuxt', '@vee-validate/nuxt', 'nuxt-yup'],
  css: ['~/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },
    optimizeDeps:{
      include: ['tiny-case', 'vue-advanced-cropper']
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://timestory.tmdsite.my.id/api',
        changeOrigin: true,
        prependPath: false
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NODE_ENV === 'development'
        ? '/api'
        : 'https://timestory.tmdsite.my.id/api'
    }
  }
})