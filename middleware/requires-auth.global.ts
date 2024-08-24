import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useUserSession } from '#imports'

const needAuth = [
  '/api/users',
  '/users',
  '/stats',
  '/admin'
]

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userSession = useUserSession()
  
  if (needAuth.some((routePath) => to.fullPath.startsWith(routePath))) {
    await userSession.fetch()
    if (!userSession.loggedIn.value) {
      return navigateTo(`/login?from=${from.fullPath}`)
    }
  }
})