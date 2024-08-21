import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from "#imports"

import { prismaClient } from "~/server/orm"
import UserDto from "~/server/dtos/user-dto"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  let status = 200
  let result = null

  if (id) {
    if (UserDto.check(body)) {
      try {
        result = await prismaClient.user.update({
          where: {
            id: Number(id)
          },
          data: {
            name: body.name,
            email: body.email,
          }
        })
      } catch (e) {
        status = 400
      }
    } else {
      status = 400
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