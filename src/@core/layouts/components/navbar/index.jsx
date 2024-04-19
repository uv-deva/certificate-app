// ** React Imports
import { Fragment, useState } from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'
// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'


const ThemeNavbar = props => {
  // ** Props
  const { setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center' >
      <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto' >
        {/*<NotificationDropdown />*/}
        {/**<IntlDropdown />*/}
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar
