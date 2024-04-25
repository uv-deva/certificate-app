// ** React Imports
import React, { Fragment, Suspense, useContext, lazy } from 'react'

// ** Utils
import { useLayout } from '@hooks/useLayout'
import { AbilityContext } from '@src/utility/context/Can'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Routes, Navigate } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, RoutesList } from './routes'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn, selectUserData } from '../redux/selectors/auth'

const Router = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn())
  const user     =  useSelector(selectUserData())
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  // ** Default Layout
  const DefaultLayout = 'VerticalLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = layout => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (RoutesList) {
      RoutesList.filter(route => {
        // ** Checks if Route layout or Default layout matches current layout
        if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('@src/views/pages/misc/NotAuthorized'))

  // ** Init Error Component
  const Error = lazy(() => import('@src/views/pages/misc/Error'))

  /**
   ** Final Route Component Checks for Login & User Role and then Navigates to the route
   */
  const FinalRoute = props => {
    const route = props.route
    let action, resource
   
    if (isLoggedIn && user.pwdUpdate_needed && route?.path !== "/pages/account-settings") {
      return <Navigate to='/pages/account-settings' />
    }

    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }
    //console.log(action, resource, ability.can(action || 'read', resource))
    //console.log(isLoggedIn)

    if (
      (!isLoggedIn && route.meta === undefined) ||
      (!isLoggedIn && route.meta && !route.meta.authRoute && !route.meta.publicRoute)
    ) {
      //console.log(route)
      /**
       ** If user is not Logged in & route meta is undefined
       ** OR
       ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then Navigate user to login
       */

      return <Navigate to={{pathname:'/login', search:`to=${document.location.pathname}`}}  />
    } else if (route.meta && route.meta.authRoute && isLoggedIn) {
      // ** If route has meta and authRole and user is Logged in then Navigate user to home page (DefaultRoute)
      const url = new URL(document.location.href)
      const to = url.searchParams.get('to')

      if (to) return <Navigate to={to} />

      return <Navigate to='/' />
    } else if (isLoggedIn && route.meta.action && !ability.can(action || 'read', resource)) {
      // ** If user is Logged in and doesn't have ability to visit the page Navigate the user to Not Authorized
      return <Navigate to='/misc/not-authorized' />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}

      return (

          LayoutRoutes.map((route, idx) => {
            Object.assign(routerProps, {
              ...route,
              meta: route.meta
            })            
            return (
            <Route
              path={route.path}
              element={        
                <LayoutTag
              routerProps={routerProps}
              layout={layout}
              setLayout={setLayout}
              transition={transition}
              setTransition={setTransition}
              currentActiveItem={currentActiveItem}
            >                        
                <Suspense fallback={null}>                  
                  <LayoutWrapper
                    layout={route.layout}
                    transition={transition}
                    setTransition={setTransition}
                    /* Conditional props */
                    /*eslint-disable */
                    {...(route.appLayout
                      ? {
                          appLayout: route.appLayout
                        }
                      : {})}
                    {...(route.meta
                      ? {
                          routeMeta: route.meta
                        }
                      : {})}
                    {...(route.className
                      ? {
                          wrapperClass: route.className
                        }
                      : {})}
                    /*eslint-enable */
                  >
                      <FinalRoute route={route} {...route} />
                  </LayoutWrapper>
                  </Suspense>
                  </LayoutTag>
              }
              key={idx}
              exact={true}
            />
          )})
      )
    })
  }

  return (
      <AppRouter basename={import.meta.env.VITE_REACT_APP_BASENAME}>
        {/* <Fragment> */}
        <Routes>
          {/* If user is logged in, navigate to DefaultRoute; otherwise, to login */}
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Navigate to={user.groups[0].name === 'pilot' ? '/devices' : DefaultRoute} /> : <Navigate to="/login" />}
          />

          {/* Not Authorized Route */}
          <Route
            exact
            path="/misc/not-authorized"
            element={<BlankLayout><NotAuthorized /></BlankLayout>} // Use `element` prop
          />

          {ResolveRoutes()}

          {/* NotFound Error page */}
          <Route path="*" element={<Error />} />
        </Routes>
        {/* </Fragment> */}
      </AppRouter>
  );
};

export default Router;
