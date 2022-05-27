import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import {
  APIRequest,
  Storage
} from '../@types'
import navigate from '../functions/navigate'
import storage from './storage'

const baseURL = 'https://api.techamazon.tech/'

const Axios = axios.create({
  baseURL
})

Axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = storage.read('token')

  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})
const request = async ({
  method,
  route,
  query,
  body,
  formData,
  store = true
}: APIRequest.Options): Promise<APIRequest.Response | null> => {
  let statusError: APIRequest.Response['status'] | null = null

  const response: any = await Axios({
    method,
    url: route,
    params: query ? new URLSearchParams({ ...query }) : undefined,
    data: formData ? formData : body,
    headers: formData ? { 'Content-Type': 'multipart/form-data' } : undefined
  }).catch((err: AxiosError) => {
    statusError = err.response ? err.response.status : null

    if (statusError === 401) {
      storage.clear('all')
      window.location.pathname === '/login' ?
        null : navigate('/login')
    }
  })

  if (response?.data && store) {
    Object.keys(response.data).forEach((key) => {
      storage.write(key as Storage.key, response.data[key])
    })
  }

  return {
    status: response ? response?.status : statusError ? statusError : 500,
    data: response ? response?.data : null
  }
}

export default {
  baseURL,
  request
}
