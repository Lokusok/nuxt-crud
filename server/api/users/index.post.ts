import { defineEventHandler, readBody, setResponseStatus } from '#imports'
import { apiUsers } from '~/server/config'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await apiUsers.post('', body)

  setResponseStatus(event, response.status)

  return {
    status: response.status,
    data: response.data
  }
})