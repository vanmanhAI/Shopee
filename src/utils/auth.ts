import { User } from '@/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const setCategoryIdsToLS = (categoryIds: string[]) => {
  localStorage.setItem('category_ids', JSON.stringify(categoryIds))
}

export const getCategoryIdsFromLS = (): string[] => {
  const categoryIds = localStorage.getItem('category_ids')
  return categoryIds ? JSON.parse(categoryIds) : []
}
