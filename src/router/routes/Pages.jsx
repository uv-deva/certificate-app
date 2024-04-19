import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/reset-password',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/account-settings',
    component: lazy(() => import('../../views/pages/account-settings')),
    meta: {
    }
  },
  {
    path: '/pages/settings',
    component: lazy(() => import('../../views/pages/account-settings/Settings'))
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/certificates/data',
    component: lazy(() => import('../../views/ipfs')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default PagesRoutes
