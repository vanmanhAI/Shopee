import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LocalStorageEventTarget } from './utils/auth'
import { useContext, useEffect } from 'react'
import { AppContext } from '@/contexts/app.context'

export default function App() {
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
