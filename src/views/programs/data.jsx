// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import { Edit2, Trash2, Link2, Folder, Eye, MoreVertical } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useIntl } from 'react-intl'

// ** Custom Components
import Avatar from '@components/avatar'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/selectors/auth'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

// ** Vars
const status = {
    true : { title: 'Active', color: 'light-primary' },
    false : { title: 'In-Active', color: 'light-danger' }
  }


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
const intl = useIntl()
const userData = useSelector(selectUserData())

// ** ACL Ability Context
const ability = useContext(AbilityContext)

return [
  {
    name: 'Actions',
    allowOverflow: true,
    maxWidth: '50px',
    cell: row => {
      return (
        <div className='d-flex'>

          <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end direction='up'>
                {ability.can('view', "program") && <DropdownItem href={'#'} onClick={(e) => handleView(e, row)}>
                  <Eye className="cursor-pointer " style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"View"})}</span>
                </DropdownItem>}
                {ability.can('change', "program") && <DropdownItem  href="#" onClick={(e) => handleEdit(e, row)} >
                  <Edit2 className="cursor-pointer" style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Edit"})}</span>
                </DropdownItem>}
                {ability.can('delete', "program") && <DropdownItem href="#" onClick={(e) => handleDelete(e, row)} >
                  <Trash2 className="cursor-pointer " style={{color:'red'}}  size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Delete"})}</span>
                </DropdownItem>}
              </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  },
  {
    name: '',
    selector: 'refImage',
    sortable: true,
    minWidth: '100px',
    maxWidth: '100px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {!row.refImage ? (
          <Avatar size={'lg'} color={`grey`} content={row.name} initials style={{ cursor: 'default' }} />
        ) : (
          <Avatar imgHeight={50} imgWidth={50} img={row.refImage} style={{ cursor: 'default' }} />
        )}

      </div>
    )
  },
  {
    name: 'Identifier',
    selector: 'identifier',
    sortable: true,
    minWidth: '70px',
    cell: row => <div className='cursor-pointer' onClick={(e) => handleView(e, row)}>{row?.identifier}</div>
  },    
  {
    name: 'Owner',
    selector: 'owner',
    minWidth: '150px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
        <div className='user-info '>
          <span className='d-block font-weight-bold  word-break'>{`${row.owner.first_name}`}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth:'150px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
        <div className='user-info '>
          <span className='d-block font-weight-bold  word-break'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Url',
    selector: 'url',
    maxWidth: '30px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.url ? <a target="_blank" href={row.url}><Link2 size={20} /></a> : ""}
      </div>
    )
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '50px',
    cell: row => {
      return (
        <Badge color={status[row.status.toString()].color} pill>
          {status[row.status.toString()].title}
        </Badge>
      )
    }
  },
  {
    name: 'Smart-Contract',
    selector: 'contract',
    sortable: true,
    minWidth: '30px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <a target="_blank" href='https://sepolia.arbiscan.io/token/0x4A06178d1b0BC3b593CBabe2b5b016fABeA06023'><Link2 size={20} /></a>
      </div>
    )
  }
]
}