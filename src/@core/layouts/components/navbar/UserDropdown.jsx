// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { doLogout } from '@store/actions/auth'

// ** Third Party Components
import {useIntl} from 'react-intl'
import { UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap'
import { Settings, Power, HelpCircle } from 'react-feather'
import { DropdownMenu } from 'react-bootstrap';


// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { selectUserData } from '../../../../redux/selectors/auth'

const UserDropdown = () => {
  const intl = useIntl()
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const userData = useSelector(selectUserData())

  //** Vars
  const userAvatar = (userData && userData.refImage) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{(userData && userData['username']) || 'unknown'}</span>
          <span className='user-status'>{(userData && userData?.groups && userData?.groups[0]?.name) || 'unknown'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={13} className='mr-75' />
          <span className='align-middle'>{intl.formatMessage({id:"Settings"})}</span>
        </DropdownItem>
        <DropdownItem href='https://api.lakoma.com/media/documents/help.pdf' target='_blank'>
          <HelpCircle size={13} className='mr-75' />
          <span className='align-middle'>{intl.formatMessage({id:"Help"})}</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(doLogout())}>
          <Power size={13} className='mr-75' />
          <span className='align-middle'>{intl.formatMessage({id:"Logout"})}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
