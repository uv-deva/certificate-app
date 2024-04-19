import { Users, CheckSquare, Target } from 'react-feather'
import { mdiMapMarkerPath, mdiFlag } from '@mdi/js'

const auth = JSON.parse(localStorage.getItem('persist:aftsJune2022'))?.auth
const group = (JSON.parse(auth).userData && JSON.parse(auth).userData.groups !== undefined) && JSON.parse(auth).userData.groups[0].name

export default [
  {
    header: 'Services (web3)',
    permissionKey:"customuser"
  },
  {
    id: 'accounts',
    title: 'Accounts',
    icon: <Users size={20} />,
    navLink: '/accounts',
    permissionKey:"customuser"
  },
  {
    id: 'programs',
    title: 'Programs',
    icon: <Target size={20} />,
    navLink: '/programs',
    permissionKey:"program"
  },
  {
    id: 'certificates',
    title: 'Certificates',
    icon: <CheckSquare size={20} />,
    navLink: '/certificates',
    permissionKey:"certificate"
  },
  {
    id: 'devices',
    title: 'Devices',
    icon: <svg viewBox="0 0 24 24" width="20" height="20"><path d={mdiMapMarkerPath} /></svg>,
    navLink: '/devices',
    permissionKey:"device"
  },
  {
    id: 'missions',
    title: 'Missions',
    icon: <svg viewBox="0 0 24 24" width="20" height="20"><path d={mdiFlag} /></svg>,
    permissionKey:"scenario",
    children: (group === 'administrator' || group === 'operator' || group === 'pilot') && (
      [
        {
          id: 'all-missions',
          title: 'All Missions',
          navLink: '/missions',
          permissionKey: "scenario"
        },
        {
          id: 'conditions',
          title: 'Conditions',
          navLink: '/conditions',
          permissionKey: "condition"
        },
        {
          id: 'commands',
          title: 'Commands',
          navLink: '/commands',
          permissionKey: "command"
        },
        {
          id: 'requests',
          title: 'Requests',
          navLink: '/requests',
          permissionKey: "request"
        },
        {
          id: 'map-settings',
          title: 'Map Setting',
          navLink: '/map-settings',
          permissionKey: "waypoints"
        }
      ]
    )
  }
]