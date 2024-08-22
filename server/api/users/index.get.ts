import { defineEventHandler, getQuery, setResponseStatus } from "#imports"

import { USERS_PER_PAGE } from "~/server/config"
import { prismaClient } from "~/server/orm"
import isNumeric from '~/server/utils/is-numeric'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let status = 200
  let result = null
  let maxPage = null

  console.log('SearchQuery = ', query.query)

  if (isNumeric(String(query.page))) {
    const start = (Number(query.page) - 1) * USERS_PER_PAGE

    try {
      if (query.query) {
        result = await prismaClient.user.findMany({
          orderBy: {
            createdAt: 'desc'
          },
          where: {
            name: {
              contains: String(query.query)
            }
          }
        })
      } else {
        result = await prismaClient.user.findMany({
          skip: start,
          take: 5,
          orderBy: {
            createdAt: 'desc'
          }
        })

        maxPage = result ? Math.ceil((await prismaClient.user.count()) / USERS_PER_PAGE) : null
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
    data: result,
    max_page: maxPage
  }
})