import { defineEventHandler, readBody, setUserSession } from '#imports'
import LoginDto from '~/server/dtos/sessions-dto/login'
import { prismaClient } from '~/server/orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let status = 200

  if (LoginDto.check(body)) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        name: body.username.trim().toLowerCase()
      }
    })

    console.log('Admin >>>', admin)

    if (admin) {
      const isPasswordsEquals = await bcrypt.compare(body.password.trim().toLowerCase(), admin.password)

      console.log('Password Equals >>>', isPasswordsEquals)

      if (isPasswordsEquals) {
        await setUserSession(event, {
          user: {
            ...admin,
          },
        })
      } else {
        status = 401
      }
    } else {
      status = 403
    }

  } else {
    status = 401
  }

  return {
    status
  }
})