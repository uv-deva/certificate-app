// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import * as Icon from 'react-feather'
import {
  NavItem,
  NavLink
} from 'reactstrap'


const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props
  

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      
    </Fragment>
  )
}

export default NavbarBookmarks
