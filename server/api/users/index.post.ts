import { defineEventHandler, parseDataUrl, readBody, setResponseStatus, storeFileLocally } from '#imports'

import { prismaClient } from '~/server/orm'

import UserDto from '~/server/dtos/user-dto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let status = 201
  let result = null

  if (UserDto.check(body)) {
    try {
      result = await prismaClient.user.create({
        data: {
          name: body.name,
          email: body.email,
          avatar: body.avatar
        }
      })
    } catch (e) {
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