const pagesMenu = [
  // {
  //   label: 'Dashboard',
  //   link: '/admin/dashboard',
  //   icon: 'ri-pie-chart-2-line'
  // },
  {
    label: 'Customers',
    link: '/admin/customers',
    icon: 'ri-user-6-fill'
  },
  {
    label: 'Products',
    link: '/admin/products',
    icon: 'ri-database-fill'
  },
  {
    label: 'Orders',
    link: '/admin/orders',
    icon: 'ri-suitcase-line'
  }
  // ri-user-6-fill
  // {
  //   label: 'User Pages',
  //   icon: 'ri-account-circle-line',
  //   submenu: [

  //   ]
  // },
]

const uiElementsMenu = [
  {
    label: 'Authentication',
    icon: 'ri-suitcase-line',
    submenu: [
      {
        label: 'Login',
        link: '/auth/login'
      },
      {
        label: 'Register',
        link: '/auth/register'
      }
    ]
  }
]

export { pagesMenu, uiElementsMenu }
