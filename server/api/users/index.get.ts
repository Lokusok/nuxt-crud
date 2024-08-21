import { defineEventHandler, setResponseStatus } from "#imports"
import { apiUsers } from "~/server/config"

export default defineEventHandler(async (event) => {
  const response = await apiUsers.get('')

  setResponseStatus(event, response.status)

  return {
    status: response.status,
    data: response.data
  }
})