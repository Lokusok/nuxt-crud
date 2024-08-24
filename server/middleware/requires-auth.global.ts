import { createError, defineEventHandler, getUserSession } from "#imports"

const needAuth = [
  '/api/users'
]

export default defineEventHandler(async (event) => {
  const userSession = await getUserSession(event)
  const path = event._path

  if (path && needAuth.some((routePath) => path.startsWith(routePath))) {
    if (!userSession.user) {
      throw createError({
        status: 403
      })
    }
  }
})