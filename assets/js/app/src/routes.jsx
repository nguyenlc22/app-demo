import { useRoutes } from 'react-router-dom'

// import routes
import AdminRoutes from '@src/application/admin/routes'
import AuthRoutes from '@src/application/auth/routes'

// initial routes
const InitialRoutes = () => {
  return useRoutes([AdminRoutes, AuthRoutes])
}

export default InitialRoutes
