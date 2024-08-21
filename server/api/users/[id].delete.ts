import { defineEventHandler, getRouterParam, setResponseStatus } from "#imports"
import { prismaClient } from "~/server/orm"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  let status = 200
  let result = null

  if (id) {
    result = await prismaClient.user.delete({
      where: {
        id: Number(id)
      }
    })

    if (!result) {
      status = 404
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