import React, { PropsWithChildren } from 'react'
import LandingPageNavBar from './components/Navbar';

const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className='flex flex-col py-10 xl:px-0 counter'>
      <LandingPageNavBar />
      {children}
    </div>
  )
}
export default Layout;
