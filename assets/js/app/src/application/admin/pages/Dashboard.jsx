// import libs
import React from 'react'
import { useEffect } from 'react'

// import redux
import { useSelector } from '@src/infras/redux'

// initial login page
const DashboardPage = (props) => {
  // init redux
  const { account } = useSelector((state) => state?.account)
  //
  useEffect(() => {
    console.log('>>>Check account:', account, brand)
  }, [])
  return <h1>Admin dashboard page</h1>
}

export default DashboardPage
