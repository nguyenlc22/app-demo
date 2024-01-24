// import libs
import React from 'react'
import { lazy } from 'react'

// import components
import Loadable from '@src/common/components/Loadable'

// define pages with lazy loader
const Admin = Loadable(lazy(() => import('@src/application/admin/main')))
const Dashboard = Loadable(lazy(() => import('@src/application/admin/pages/Dashboard')))
const Customters = Loadable(lazy(() => import('@src/application/admin/pages/customers/Customers')))
const Products = Loadable(lazy(() => import('@src/application/admin/pages/products/Products')))
const Orders = Loadable(lazy(() => import('@src/application/admin/pages/orders/Orders')))

// Initial admin routes
const AdminRoutes = {
  path: '/admin',
  element: <Admin />,
  children: [
    { path: 'dashboard', index: true, element: <Dashboard /> },
    { path: 'customers', element: <Customters /> },
    { path: 'products', element: <Products /> },
    { path: 'orders', element: <Orders /> }
  ]
}

export default AdminRoutes
