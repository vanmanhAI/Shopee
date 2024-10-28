import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '@/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from '@/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = (response.data as AuthResponse).data
          const { access_token } = data
          this.accessToken = access_token
          setProfileToLS(data.user)
          setAccessTokenToLS(access_token)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }

        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data = error.response?.data as { message: string }
          console.log(data)

          toast.error(data?.message || 'Có lỗi xảy ra')
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
