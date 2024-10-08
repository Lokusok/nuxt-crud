import { defineEventHandler, getRouterParam, setResponseStatus } from "#imports"

import { prismaClient } from "~/server/orm"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  let status = 200
  let result = null

  if (id) {
    try {
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