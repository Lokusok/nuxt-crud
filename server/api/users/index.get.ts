import { defineEventHandler, getQuery, setResponseStatus } from "#imports"

import { USERS_PER_PAGE } from "~/server/config"
import { prismaClient } from "~/server/orm"
import isNumeric from '~/server/utils/is-numeric'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let status = 200
  let result = null

  if (isNumeric(String(query.page))) {
    const start = (Number(query.page) - 1) * USERS_PER_PAGE

    try {
      result = await prismaClient.user.findMany({
        skip: start,
        take: 5,
        orderBy: {
          createdAt: 'desc'
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
    data: result,
    max_page: result ? Math.ceil((await prismaClient.user.count()) / USERS_PER_PAGE) : null
  }
})