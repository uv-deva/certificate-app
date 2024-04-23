// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import { Edit2, Trash2, Folder, Eye, MoreVertical } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem } from 'reactstrap'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'

// ** Custom Components
import Avatar from '@components/avatar'
import InfoModal from '@src/components/InfoModal'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'
import { onTableRegister } from '../../redux/actions/table'
import PartnerLoader from '../../components/CellLoader/PartnerLoader'

const status = {
    true: { title: 'Yes', color: 'light-primary' },
    false: { title: 'No', color: 'light-danger' }
  }


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {    
const intl = useIntl()
const dispatch = useDispatch()

// ** ACL Ability Context
const ability = useContext(AbilityContext)
  
function handleRegistration(e, row) {
  dispatch(onTableRegister('partners', row.id, {register: !row.mctStatus}))
}

return [
  {
    name: 'Actions',
    allowOverflow: true,
    maxWidth:'80px',
    cell: row => {
      return (
        <div className='d-flex'>
           <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end direction='up'>
                <div style={{inset: '0px 0px auto auto'}}>
                  <DropdownItem href={'#'} onClick={(e) => handleView(e, row)}>
                    <Eye className="cursor-pointer " style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"View"})}</span>
                  </DropdownItem>
                  {ability.can('change', "customuser") && <DropdownItem  href="#" onClick={(e) => handleEdit(e, row)} >
                  <Edit2 className="cursor-pointer" style={{color:'green'}} size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Edit"})}</span>
                  </DropdownItem>}
                  {ability.can('delete', "customuser") && <DropdownItem href="#" onClick={(e) => handleDelete(e, row)} >
                    <Trash2 className="cursor-pointer " style={{color:'red'}}  size={20}  /> <span className='align-middle'>{intl.formatMessage({id:"Delete"})}</span>
                  </DropdownItem>}
                  <DropdownItem onClick={(e) => handleRegistration(e, row)} >{!row.mctStatus ? 'Register' : 'Unregister'}</DropdownItem>
                </div>
              </DropdownMenu>
        </UncontrolledDropdown>
        </div>
      )
    }
  },
  {
    name: 'logo',
    selector: (row) => row.username,
    sortable: true,
    minWidth:'50px',
    maxWidth:'70px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center'>
        {!row.refImage  ? (
          <Avatar size={'lg'}  color={`grey`} content={row.username[0]} initials />
        ) : (
          <Avatar imgHeight={50} imgWidth={50} img={row.refImage} />
        )}
        
      </div>
    )
  },  
  {
    name: 'Account',
    selector: (row) => row.username,
    sortable: true,
    minWidth:'120px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
        <div className='user-info text-truncate'>
        <span className='d-block font-weight-bold text-truncate'>{row.create_account ? row.username : ""}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Login',
    selector: 'create_account',
    sortable: true,
    minWidth: '40px',
    cell: row => {
        return (row?.create_account.toString() ? <Badge color={status[row.create_account.toString()].color} pill>
            {status[row.create_account.toString()].title}
        </Badge> : "")

    }
  },
  {
    name: 'Name',
    selector: (row) => row.first_name,
    sortable: true,
    minWidth:'300px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>
        
        <div className='user-info '>
          <span className='d-block font-weight-bold word-break'>{row.first_name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Groups',
    selector: (row) => row.username,
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.groups.map((o) => o.name)}
      </div>
    )
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    sortable: true, //.substring(0, 7);
    minWidth: '200px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>
        
    <div className='user-info '>
      <span className='d-block font-weight-bold word-break'> <InfoModal smallText={row.description.substring(0, 50)} largeText={row.description} /></span>
    </div>
  </div>
    
  },
  {
    name: 'Status',
    selector:  row => row['mctStatus'],
    maxWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
          <PartnerLoader row={row} type={'Status'} init={true}/>
      </div>
    )
  },
  {
    name: 'Document',
    selector: (row) => row.refDocuments,
    cell: row => (
      <div className='d-flex align-items-center word-break text-truncate '>
        
        {row?.refDocuments && row?.refDocuments.length > 0 && <div className='user-info '>
          <span className='d-block font-weight-bold word-break'> 
            <InfoModal
            smallText={<Folder size={20}/>} 
            largeText={<div className='flex-1 d-flex flex-column'>
              <ListGroup numbered>
              {row?.refDocuments.map(link => <ListGroupItem><a href={link.file} target={"_blank"} >{link.file.split('/').pop()}</a></ListGroupItem>)}
              </ListGroup>
            </div>} 
            />
          </span>
        </div>}
  </div>
    )
  }
]
}
