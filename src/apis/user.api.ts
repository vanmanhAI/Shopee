import { User } from '@/types/user.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

interface updatedProfileBody extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string
  newPassword?: string
}

export const getProfile = () => {
  return http.get<SuccessResponse<User>>('me')
}

export const updateProfile = (body: updatedProfileBody) => {
  return http.put<SuccessResponse<User>>('user', body)
}

export const uploadAvatar = (body: FormData) => {
  return http.put<SuccessResponse<string>>('user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
