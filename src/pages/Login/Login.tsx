import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '@/apis/auth.api'
import Button from '@/components/Button'
import Input from '@/components/Input'
import path from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import { ErrorResponse } from '@/types/utils.type'
import { isUnprocessableEntityAxiosError } from '@/utils/utils'

interface LoginForm {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<LoginForm>()

  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (body: LoginForm) => login(body)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate(-1)
        reset()
      },
      onError(error) {
        type errorType = LoginForm
        if (isUnprocessableEntityAxiosError<ErrorResponse<errorType>>(error)) {
          const formError = error.response?.data.data
          for (const key in formError) {
            setError(
              key as keyof errorType,
              {
                message: formError[key as keyof errorType],
                type: 'manual'
              },
              {
                shouldFocus: true
              }
            )
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container h-[600px] min-h-[600px] max-w-[1040px] bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745")] bg-contain bg-no-repeat bg-center flex items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-20 w-full'>
          <div className='w-[400px] justify-self-end lg:col-span-2 lg:col-start-4'>
            <section>
              <form className='p-10 pb-[30px] rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-xl text-[#222]'>Đăng nhập</div>
                <Input
                  type='email'
                  autoFocus
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                  className='mt-8 border-gray-300'
                  register={register}
                  name='email'
                />
                <Input
                  type='password'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  className='mt-[0.625rem] leading-normal'
                  register={register}
                  name='password'
                />
                <div className='mt-[0.625rem]'>
                  <Button
                    disabled={loginMutation.isPending}
                    type='submit'
                    className='w-full rounded-sm text-center text-sm uppercase py-[0.625rem] px-2 bg-orange shadow-sm text-white hover:bg-red-500'
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className='mt-[1.875rem] text-center'>
                  <div className='flex items-center whitespace-pre justify-center text-sm gap-[0.125rem]'>
                    <span className='text-[#94a3b8]'>Bạn mới biết đến shopee?</span>
                    <Link to={path.register} className='text-orange'>
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
