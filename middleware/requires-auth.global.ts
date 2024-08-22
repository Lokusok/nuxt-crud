import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useUserSession } from '#imports'

const needAuth = [
  '/api/users',
  '/users',
  '/stats'
]

export default defineNuxtRouteMiddleware((to, from) => {
  const userSession = useUserSession()
  
  if (needAuth.some((routePath) => to.fullPath.startsWith(routePath))) {
    console.log(to.fullPath, '<<< Нужна авторизация')
    console.log(userSession.loggedIn.value, '<<< Статус авторизации')
    if (!userSession.loggedIn.value) {
      return navigateTo(`/login?from=${from.fullPath}`)
    }
  }
})