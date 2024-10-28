import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from '@/constants/path'
import { AppContext } from '@/contexts/app.context'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} replace />
}
