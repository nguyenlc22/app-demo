// import libs
import React from 'react'
import { Suspense } from 'react'

// import projects
import Loader from '@src/common/components/Loader'

// loadable components
const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
)

export default Loadable
