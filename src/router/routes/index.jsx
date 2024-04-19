// ** Routes Imports
import AppRoutes from './Apps'
import PagesRoutes from './Pages'

// ** Document title
const TemplateTitle = '%s - Admin'

// ** Default Route
const DefaultRoute = '/accounts'

// ** Merge Routes
const Routes = [
  ...AppRoutes,
  ...PagesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
