import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from "#imports"
import { prismaClient } from "~/server/orm"
import UserDto from "~/server/dtos/user-dto"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  let status = 200
  let result = null

  if (id) {
    if (!UserDto.check(body)) {
      status = 400
    } else {
      result = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name: body.name,
          email: body.email,
        }
      })
    }

  } else {
    status = 400
  }

  console.log('UPDATE', body)
  console.log('RESULT', status, result)

  setResponseStatus(event, status)

  return {
    status: status,
    data: result
  }
})