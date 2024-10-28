import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { schemaCommonAuth } from '@/utils/rules'
import Input from '@/components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '@/apis/auth.api'
import { isUnprocessableEntityAxiosError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import Button from '@/components/Button'
import path from '@/constants/path'

interface RegisterForm {
  email: string
  password: string
  confirm_password: string
}

const schema = Joi.object<Pick<RegisterForm, 'confirm_password'>>({
  confirm_password: Joi.valid(Joi.ref('password')).required().messages({
    'any.only': 'Password không khớp',
    'string.empty': 'Password không được để trống',
    'any.required': 'Password không được để trống'
  })
}).concat(schemaCommonAuth)

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: joiResolver(schema)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterForm, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...body } = data
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
        reset()
      },
      onError(error) {
        type errorType = Omit<RegisterForm, 'confirm_password'>
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
      <div className='container h-[600px] min-h-[600px] max-w-[1040px] bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745")] bg-contain bg-no-repeat bg-center'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-20 w-full'>
          <div className='lg:col-span-2 lg:col-start-4 w-[400px] justify-self-end '>
            <section>
              <form className='p-10 pb-[30px] rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-xl text-[#222]'>Đăng ký</div>
                <Input
                  type='email'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                  className='mt-8'
                  register={register}
                  name='email'
                  autoFocus
                />
                <Input
                  type='password'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  className='mt-[0.625rem]'
                  register={register}
                  name='password'
                />
                <Input
                  type='password'
                  errorMessage={errors.confirm_password?.message}
                  placeholder='Confirm Password'
                  className='mt-[0.625rem]'
                  register={register}
                  name='confirm_password'
                />
                <div className='mt-[0.625rem]'>
                  <Button
                    disabled={registerAccountMutation.isPending}
                    type='submit'
                    className='w-full rounded-sm text-center text-sm uppercase py-[0.625rem] px-2 bg-orange shadow-sm text-white hover:bg-red-500'
                  >
                    Đăng ký
                  </Button>
                </div>
                <div className='mt-[1.875rem] text-center'>
                  <div className='flex items-center whitespace-pre justify-center text-sm gap-[0.125rem]'>
                    <span className='text-[#94a3b8]'>Bạn đã có tài khoản</span>
                    <Link to={path.login} className='text-orange'>
                      Đăng nhập
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
