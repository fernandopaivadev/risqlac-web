import axios, { AxiosRequestConfig } from 'axios'
import storage from './storage'

import {
  APIRequestOptions,
  CustomAxiosInstance,
  RefreshTokenModel
} from '../@types'

const baseURL = 'http://localhost:3000'

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = storage.read('token')

  if (token) {
    config?.headers ? config.headers.authorization = `Bearer ${token}` : null
  }

  return config
})

const request = async ({
  method,
  route,
  query,
  body,
  noStore = false,
  retry = true
}: APIRequestOptions): Promise<{
    status:
    number,
    data?: {
        [key: string]: any
    }
} | null> => {
  try {
    if (body) {
      body.params = query
    } else {
      body = {
        params: query
      }
    }

    const { status, data } = await axiosInstance[method](route, body)

    if (status === 200 && method === 'get') {
      const keys = Object.keys(data)

      if (!noStore) {
        keys.forEach(key => {
          storage.write(key, data[key])
        })
      }
    }

    return { status, data }
  } catch (err: any) {
    if (err?.response?.data?.message) {
      if (err?.response?.status === 401) {
        const refreshToken: RefreshTokenModel | null = storage.read('refreshToken')

        if (refreshToken) {
          try {
            const { id } = refreshToken

            const { status, data } = await axiosInstance.get(
              '/user/refresh-token', {
                params: {
                  id
                }
              }
            )

            if (status === 200) {
              storage.write('token', data.token)
              storage.write('refreshToken', data.refreshToken)

              if (retry) {
                return await request({
                  method,
                  route,
                  query,
                  body,
                  noStore,
                  retry: false
                })
              } else {
                window.location.reload()
              }
            } else if (status === 401) {
              window.location.replace(
                `${window.location.href.split('#')[0]}#/login`
              )
            }
          } catch (err: any) {
            if (err?.response?.status === 404) {
              if (retry) {
                return await request({
                  method,
                  route,
                  query,
                  body,
                  noStore,
                  retry: false
                })
              }
            } else if (err?.response?.status === 500) {
              window.location.replace(
                `${window.location.href.split('#')[0]}#/login`
              )
            } else {
              return null
            }
          }
        } else {
          console.log(
            'API REQUEST: ERRO DE REQUISIÇÃO > missing refresh token'
          )
        }
      }

      console.log(`ERRO NO SERVIDOR: ${err?.response?.data?.message
      }`)
    } else if (err?.message) {
      console.log(`API REQUEST: ERRO DE REQUISIÇÃO >: ${err?.message
      }`)
    } else {
      console.log('API REQUEST: ERRO NÃO IDENTIFICADO')
    }

    return {
      status: err?.response?.status
    }
  }
}

export default {
  baseURL,
  request
}
