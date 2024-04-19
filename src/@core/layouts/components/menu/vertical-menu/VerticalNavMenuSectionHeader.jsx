// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import { FormattedMessage } from 'react-intl'
import { MoreHorizontal } from 'react-feather'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

const VerticalNavMenuSectionHeader = ({ item, index }) => {

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  return (
    ability.can('view', item.permissionKey) ? <li className='navigation-header'>
      <span>
        <FormattedMessage id={item.header} />
      </span>
      <MoreHorizontal className='feather-more-horizontal' />
    </li> : null
  )
}

export default VerticalNavMenuSectionHeader
