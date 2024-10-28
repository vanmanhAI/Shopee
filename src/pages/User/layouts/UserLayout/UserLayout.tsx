import UserSideNav from '@/pages/User/components/UserSideNav'

interface Props {
  children?: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div className='bg-[#f5f5f5] text-sm leading-tight'>
      <div className='container'>
        <div className='flex gap-[1.6875rem] pt-5 pb-[3.125rem]'>
          <UserSideNav />
          {children}
        </div>
      </div>
    </div>
  )
}
