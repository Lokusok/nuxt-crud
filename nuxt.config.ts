// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt'
  ],
  app: {
    head: {
      title: 'Nuxt CRUD',
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    serverApiBase: 'https://jsonplaceholder.typicode.com/'
  }
})