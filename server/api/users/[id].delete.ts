import { defineEventHandler, getRouterParam, setResponseStatus } from "#imports"
import { apiUsers } from '~/server/config'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const response = await apiUsers.delete(`/${id}`)

  setResponseStatus(event, response.status)

  return {
    status: response.status,
    data: response.data
  }
})