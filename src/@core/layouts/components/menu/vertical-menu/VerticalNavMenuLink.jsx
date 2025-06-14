// ** React Imports
import { useEffect, useContext } from 'react'
import { NavLink, useLocation, matchPath } from 'react-router-dom'

// ** Third Party Components
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

// ** Vertical Menu Array Of Items
import navigation from '@src/navigation/vertical'

// ** Utils
import { search, getAllParents } from '@layouts/utils'
import { AbilityContext } from '@src/utility/context/Can'


const VerticalNavMenuLink = ({
  item,
  groupActive,
  setGroupActive,
  activeItem,
  setActiveItem,
  groupOpen,
  setGroupOpen,
  toggleActiveGroup,
  parentItem,
  routerProps,
  currentActiveItem
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname.toString(); 

  // ** To match path
  const match = matchPath({
    path: `${item.navLink}`,
    exact: true,
  }, currentURL.toString())

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  // ** Search for current item parents
  const searchParents = (navigation, currentURL) => {
    const parents = search(navigation, currentURL, routerProps) // Search for parent object
    const allParents = getAllParents(parents, 'id') // Parents Object to Parents Array
    return allParents
  }

  // ** URL Vars
  const resetActiveGroup = navLink => {
    const parents = search(navigation, navLink, match)
    toggleActiveGroup(item.id, parents)
  }

  // ** Reset Active & Open Group Arrays
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }

  // ** Checks url & updates active item
  useEffect(() => {
    console.log("location", currentActiveItem)
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(navigation, currentURL)
      setGroupActive([...arr])
    }
  }, [location])

  const funIsActive = (match, location) => {
      if (!match) {
        return false
      }

      if (match.pathname && match.pathname !== '' && match.pathname === item.navLink) {
        currentActiveItem = item.navLink
      }
  }

  return ability.can('view', item.permissionKey) ? (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: funIsActive(match, location)
            })}
        /*eslint-enable */
        onClick={e => {
          if (!item.navLink.length) {
            e.preventDefault()
          }
          parentItem ? resetActiveGroup(item.navLink) : resetActiveAndOpenGroups()
          console.log(parentItem)
        }}
      >
        {item.icon}
        <span className='menu-item text-truncate'>
          <FormattedMessage id={item.title} />
        </span>

        {item.badge && item.badgeText ? (
          <Badge className='ml-auto mr-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  ) : null
}

export default VerticalNavMenuLink
