import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/materials',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/materials'))
  },
  {
    path: '/material_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/materials'))
  },
  {
    path: '/nodes',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/nodes')),
    meta: {
      action:"view",
      resource:"node"
    }
  },
  {
    path: '/node_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/nodes'))
  },
  {
    path: '/programs',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/programs')),
    meta: {
      action:"view",
      resource:"program"
    }
  },
  {
    path: '/program_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/programs'))
  },
  {
    path: '/wallets',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/wallets')),
    meta: {
      action:"view",
      resource:"wallet"
    }
  },
  {
    path: '/wallet_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/wallets'))
  },
  {
    path: '/certificates',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/cert')),
    meta: {
      action:"view",
      resource:"certificate"
    }
  },
  {
    path: '/certificate_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/certificates'))
  },
  {
    path: '/certificates',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/cert'))
  },
  {
    path: '/impact_types',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types/impacts'))
  },
  {
    path: '/accounts',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/accounts')),
    meta: {
      action:"view",
      resource:"customuser"
    }
  },
  {
    path: '/settings',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/types'))
  },
  {
    path: '/devices',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/devices')),
    meta: {
      action:"view",
      resource:"device"
    }
  },
  {
    path: '/missions',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/Scenarios')),
    meta: {
      action:"view",
      resource:"scenario"
    }
  },
  {
    path: '/conditions',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/Conditions')),
    meta: {
      action:"view",
      resource:"condition"
    }
  },
  {
    path: '/commands',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/Commands')),
    meta: {
      action:"view",
      resource:"command"
    }
  },
  {
    path: '/requests',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/Requests')),
    meta: {
      action:"view",
      resource:"request"
    }
  },
  {
    path: '/map-settings',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('../../views/MapSettings')),
    meta: {
      action:"view",
      resource:"waypoints"
    }
  }
]

export default AppRoutes
