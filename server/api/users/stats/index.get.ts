import { defineEventHandler, setResponseStatus } from '#imports'
import { prismaClient } from '~/server/orm'

export default defineEventHandler(async (event) => {
  let status = 200
  let result = null

  try {
    const usersWithAvatar = await prismaClient.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              avatar: ''
            },
            {
              avatar: null
            }
          ]
        }
      }
    })
  
    const usersWithoutAvatar = await prismaClient.user.findMany({
      where: {
        OR: [
          {
            avatar: ''
          },
          {
            avatar: null
          }
        ]
      }
    })

    result = {
      usersWithAvatar,
      usersWithoutAvatar
    }
  } catch (e) {
    if (e instanceof Error) {
      status = 400
    }
  }

  setResponseStatus(event, status)

  return {
    status,
    result
  }
})