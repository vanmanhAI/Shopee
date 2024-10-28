import { memo } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface Props {
  children?: React.ReactNode
}

const MainLayoutInner = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
