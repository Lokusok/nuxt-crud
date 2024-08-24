import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useUserSession } from '#imports'

const notNeedAuth = [
  '/login',
  '/register'
]

export default defineNuxtRouteMiddleware((to) => {
  const userSession = useUserSession()
  
  if (notNeedAuth.some((routePath) => to.fullPath.startsWith(routePath))) {
    console.log(to.fullPath, '<<< Не нужна авторизация')
    console.log(userSession.loggedIn.value, '<<< Статус авторизации')
    if (userSession.loggedIn.value) {
      return navigateTo(`/`)
    }
  }
})