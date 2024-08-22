import { defineEventHandler, getRouterParam, getUserSession, setResponseStatus } from "#imports"

import { prismaClient } from "~/server/orm"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const userSession = await getUserSession(event)

  let status = 200
  let result = null

  if (id) {
    try {
      console.log('Полетел запрос в БД')
      result = await prismaClient.user.findFirst({
        where: {
          id: Number(id)
        }
      })

      if (!result) {
        status = 404
      }
    } catch (e) {
      if (e instanceof Error) {
        status = 400
      }
    }
  } else {
    status = 400
  }

  setResponseStatus(event, status)

  return {
    status: status,
    data: result
  }
})