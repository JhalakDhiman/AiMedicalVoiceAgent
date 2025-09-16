import React from 'react'
import AppHeader from './_components/AppHeader';

const DashboardLayout = ({children}) => {
  return (
    <div>
        <AppHeader/>
        <div className='px-10 md:px-20 lg:px-32'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout
