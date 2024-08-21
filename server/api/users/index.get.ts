import { defineEventHandler, getQuery, setResponseStatus } from "#imports"
import { apiUsers, USERS_PER_PAGE } from "~/server/config"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const start = (Number(query.page) - 1) * USERS_PER_PAGE

  if (Number.isNaN(start)) {
    return {
      status: 404,
      data: []
    }
  }

  const response = await apiUsers.get(`?_start=${start}&_limit=${USERS_PER_PAGE}`)

  setResponseStatus(event, response.status)

  return {
    status: response.status,
    data: response.data,
    max_page: 2
  }
})