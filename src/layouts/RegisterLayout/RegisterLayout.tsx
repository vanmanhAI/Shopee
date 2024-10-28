import Footer from '@/components/Footer'
import RegisterHeader from '@/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

export const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer inRegisterLayout={true} />
    </div>
  )
}
