// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  routeRules: {
    '/stats/**': { ssr: false }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    'nuxt-svgo',
    'nuxt-auth-utils',
    "@nuxt/eslint",
    '@vee-validate/nuxt',
    '@nuxtjs/i18n'
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
  i18n: {
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    }
  },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    serverApiBase: 'https://jsonplaceholder.typicode.com/',
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
  eslint: {

  },
  vite: {
    ssr: {
      external: ["@prisma/client"]
    },
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  }
})