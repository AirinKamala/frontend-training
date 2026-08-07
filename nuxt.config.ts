// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  modules: ['@pinia/nuxt', '@vee-validate/nuxt', 'nuxt-yup', '@nuxtjs/supabase'],
  supabase: { redirect: false, types: false},
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },
    optimizeDeps: {
      include: ['tiny-case', 'vue-advanced-cropper', '@supabse/supabse-js']
    }
  },
  css: ['assets/scss/global.scss'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})