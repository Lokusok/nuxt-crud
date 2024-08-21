import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from "#imports"
import { apiUsers } from '~/server/config'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const response = await apiUsers.patch(`/${id}`, body)

  setResponseStatus(event, response.status)

  return {
    status: response.status,
    data: response.data
  }
})