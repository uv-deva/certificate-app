// ** Third Party Components
import { Edit2, Trash2, Eye, MoreVertical } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useIntl } from 'react-intl'


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
  const intl = useIntl()

  return [
  {
    name: 'Identifier',
    selector: 'id',
    sortable: true,
    minWidth: '50px'
  },    
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate'>
          <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Description',
    selector: 'description'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex text-left'>
          
          <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right direction='up'>
                <DropdownItem href={'#'} onClick={(e) => handleView(e, row)}>
                  <Eye className="cursor-pointer " style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"View"})}</span>
                </DropdownItem>
                <DropdownItem  href="#" onClick={(e) => handleEdit(e, row)} >
                <Edit2 className="cursor-pointer" style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Edit"})}</span>
                </DropdownItem>
                <DropdownItem href="#" onClick={(e) => handleDelete(e, row)} >
                  <Trash2 className="cursor-pointer " style={{color:'red'}}  size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Delete"})}</span>
                </DropdownItem>
              </DropdownMenu>
        </UncontrolledDropdown>
        </div>
      )
    }
  }
]
}
