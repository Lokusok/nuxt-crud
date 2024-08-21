import { defineEventHandler, getUserSession } from '#imports'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  console.log('Session >>>', session)
})
