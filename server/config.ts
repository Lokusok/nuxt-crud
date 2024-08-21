import { useRuntimeConfig } from '#imports'
import axios from 'axios'

export const apiUsers = axios.create({
  baseURL: useRuntimeConfig().serverApiBase + '/users'
})