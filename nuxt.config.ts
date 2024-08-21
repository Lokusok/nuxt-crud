// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  app: {
    head: {
      title: 'Nuxt CRUD',
      script: [{ src: 'https://cdn.tailwindcss.com' }]
    }
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
