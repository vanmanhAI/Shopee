import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '@/contexts/app.context'
import path from '@/constants/path'

export const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} replace />
}
