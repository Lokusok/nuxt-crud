import { defineEventHandler, readBody, setResponseStatus } from '#imports'

import bcrypt from 'bcrypt'

import RegisterDto from '~/server/dtos/sessions-dto/register'
import { prismaClient } from '~/server/orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let status = 200

  if (RegisterDto.check(body)) {
    const hashedPassword = await bcrypt.hash(body.password.trim().toLowerCase(), 10)

    try {
      await prismaClient.admin.create({
        data: {
          name: body.username.trim().toLowerCase(),
          password: hashedPassword
        }
      })
    } catch (e) {
      console.log('Error = ', e)
      status = 400
    }
  } else {
    status = 401
  }

  setResponseStatus(event, status)

  return {
    status: status
  }
})