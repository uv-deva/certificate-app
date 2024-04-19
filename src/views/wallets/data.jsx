// ** Third Party Components
import { Edit2, Trash2, Link2, Folder, Eye, MoreVertical } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem } from 'reactstrap'
import { useIntl } from 'react-intl'
// ** Custom Components
import Avatar from '@components/avatar'
import InfoModal from '@src/components/InfoModal'

// ** Vars
const status = {
    true : { title: 'Active', color: 'light-primary' },
    false : { title: 'In-Active', color: 'light-danger' }
  }


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
const intl = useIntl()

return [
  {
    name: 'Actions',
    maxWidth: '50px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>

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
  },
  {
    name: 'Identifier',
    selector: 'identifier',
    sortable: true,
    minWidth: '50px',
    cell: row => <div className='cursor-pointer' onClick={(e) => handleView(e, row)}>{row?.identifier}</div>
  },    
  {
    name: 'Account',
    selector: 'account',
    sortable: true,
    minWidth:'200px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
        <div className='user-info '>
          <span className='d-block font-weight-bold  word-break'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Balance',
    selector:  row => row['balance'],
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        row.balance
      )
    }
  },
  {
    name: 'Type',
    selector:  row => row['model_type'],
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
        <div className='user-info '>
          
          <span className='d-block font-weight-bold  word-break'>
        <i className={row?.model_type === "account" ? "bx bx-user" : "mdi mdi-map-marker-path"} />
            &nbsp;{row.model_type}</span>
        </div>
      </div>
      )
    }
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[row.status.toString()].color} pill>
          {status[row.status.toString()].title}
        </Badge>
      )
    }
  },
  {
    name: 'public key',
    selector: 'AccountAddrPub',
    sortable: true, //.substring(0, 7);
    minWidth: '300px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>
        
    <div className='user-info '>
      <span className='d-block font-weight-bold  word-break'><a target='_blank' href={`https://sepolia.arbiscan.io/address/${row.accountAddrPub}`}>{row.accountAddrPub}</a></span>
    </div>
  </div> 
  },
  {
    name: 'Proofed',
    selector: 'proofed',
    sortable: true, //.substring(0, 7);
    minWidth: '150px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>

      <div className='user-info '>
        <span className='d-block font-weight-bold  word-break'><a target='_blank' href={`https://sepolia.arbiscan.io/tx/0xcc4c807c92b1480d71a5859483adec550f62683c663a9e42152f91b0de70894e`}>UBW-Token (valid)</a></span>
      </div>
    </div>
  }
]
}