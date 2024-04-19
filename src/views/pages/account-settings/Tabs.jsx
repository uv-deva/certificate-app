import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock } from 'react-feather'
import { useDispatch } from 'react-redux'
import { doAllLogout } from '../../../redux/actions/auth'
import {useIntl} from 'react-intl'

const Tabs = ({ activeTab, toggleTab, data }) => {
  const intl = useIntl()
  const dispatch = useDispatch()

  const userType = data?.groups[0]?.name
  //handle logout user from all devices click event
  const onLogout = () => {

    if (confirm(intl.formatMessage({id:"Are you sure? you want to log off from all devices?"}))) {
      dispatch(doAllLogout())
    }

  }

  return (
    <Nav className='nav-left' pills vertical>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>{intl.formatMessage({id:"General"})}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>{intl.formatMessage({id:"Change Password"})}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>{intl.formatMessage({id: (userType === 'administrator' || userType === 'operator' || userType === 'pilot') ? "Mission Control Contract" : "Certificate Contract"})}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink  onClick={() => onLogout()}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>{intl.formatMessage({id:"Logout (All Devices)"})}</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
