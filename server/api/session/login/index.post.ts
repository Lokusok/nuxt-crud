import { defineEventHandler, readBody, setResponseStatus, setUserSession } from '#imports'
import LoginDto from '~/server/dtos/sessions-dto/login'
import { prismaClient } from '~/server/orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let status = 200

  if (LoginDto.check(body)) {
    try {
      const admin = await prismaClient.admin.findFirst({
        where: {
          name: body.username.trim().toLowerCase()
        }
      })

      if (admin) {
        const isPasswordsEquals = await bcrypt.compare(body.password.trim().toLowerCase(), admin.password)
  
        if (isPasswordsEquals) {
          await setUserSession(event, {
            user: {
              ...admin,
            },
          })
        } else {
          status = 400
        }
      } else {
        status = 403
      }
    } catch (e) {
      if (e instanceof Error) {
        status = 400
      }
    }
  } else {
    status = 401
  }

  setResponseStatus(event, status)

  return {
    status
  }
})