// import libs
import React from 'react'
import { Outlet } from 'react-router-dom'

// import components
import SideBar from '@src/common/layouts/Sidebar'

// Init auth main
const AuthMain = () => {
  return (
    <>
      <SideBar />
      <div className='main p-3'>
        <div className='row'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthMain
