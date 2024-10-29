/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import RejectedRoute from '@/components/RejectedRoute'
import path from '@/constants/path'
import MainLayout from '@/layouts/MainLayout'
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
const ProductList = lazy(() => import('@/pages/ProductList/ProductList'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'))
const Profile = lazy(() => import('@/pages/User/pages/Profile'))
import Register from '@/pages/Register'
import Spinner from '@/components/Spinner'
import FallBack from '@/pages/ProductDetail/components/FallBack'
import Cart from '@/pages/Cart'
import CartLayout from '@/layouts/CartLayout'
import UserLayout from '@/pages/User/layouts/UserLayout'
import ChangePassword from '@/pages/User/pages/ChangePassword'
import HistoryPurchase from '@/pages/User/pages/HistoryPurchase'
import ChangePhone from '@/pages/User/pages/ChangePhone'

export const router = createBrowserRouter([
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: path.login,
        element: (
          <RegisterLayout>
            <Suspense>
              <Login />
            </Suspense>
          </RegisterLayout>
        )
      },
      {
        path: path.register,
        element: (
          <RegisterLayout>
            <Suspense>
              <Register />
            </Suspense>
          </RegisterLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: path.user,
        children: [
          {
            path: path.profile,
            element: (
              <MainLayout>
                <UserLayout>
                  <Suspense>
                    <Profile />
                  </Suspense>
                </UserLayout>
              </MainLayout>
            )
          },
          {
            path: path.changePassword,
            element: (
              <MainLayout>
                <UserLayout>
                  <ChangePassword />
                </UserLayout>
              </MainLayout>
            )
          },
          {
            path: path.changePhone,
            element: (
              <MainLayout>
                <UserLayout>
                  <ChangePhone />
                </UserLayout>
              </MainLayout>
            )
          },
          {
            path: path.historyPurchase,
            element: (
              <MainLayout>
                <UserLayout>
                  <HistoryPurchase />
                </UserLayout>
              </MainLayout>
            )
          }
        ]
      },
      {
        path: path.cart,
        children: [
          {
            index: true,
            element: (
              <CartLayout>
                <Suspense>
                  <Cart />
                </Suspense>
              </CartLayout>
            )
          }
        ]
      }
    ]
  },
  {
    path: path.home,
    children: [
      {
        index: true,
        element: (
          <MainLayout>
            <Suspense fallback={<Spinner />}>
              <ProductList />
            </Suspense>
          </MainLayout>
        )
      },
      {
        path: path.productDetail,
        element: (
          <MainLayout>
            <Suspense fallback={<FallBack />}>
              <ProductDetail />
            </Suspense>
          </MainLayout>
        )
      }
    ]
  }
])
