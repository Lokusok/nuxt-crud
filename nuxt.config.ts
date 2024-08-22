// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    'nuxt-svgo',
    'nuxt-auth-utils',
    'nuxt-file-storage'
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
  },
  prisma: {
    installStudio: false
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Montserrat', 'sans-serif']
          }
        }
      }
    }
  },
})