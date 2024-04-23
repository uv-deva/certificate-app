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
    name: '',
    selector: 'refImage',
    sortable: true,
    minWidth:'100px',
    maxWidth:'100px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center cursor-pointer'>
        {!row.refImage ? (
          <Avatar className='cursor-pointer' size={'lg'} color={`grey`} content={row.name[0]} initials style={{cursor:'default'}} />
        ) : (
          <Avatar className='cursor-pointer' imgHeight={50} imgWidth={50} img={row.refImage} style={{cursor:'default'}} />
        )}
        
      </div>
    )
  },  
  {
    name: 'Identifier',
    selector: 'identifier',
    sortable: true,
    minWidth: '50px',
    cell: row => <div className='cursor-pointer' onClick={(e) => handleView(e, row)}>{row?.identifier}</div>
  },    
  {
    name: 'Name',
    selector: 'name',
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
    name: 'Description',
    selector: 'description',
    sortable: true, //.substring(0, 7);
    minWidth: '300px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>
        
    <div className='user-info '>
      <span className='d-block font-weight-bold word-break'> <InfoModal smallText={row.description.substring(0, 50)} largeText={row.description} /></span>
    </div>
  </div>
    
  },
  {
    name: 'Document',
    selector: 'refDocument',
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
  },
  {
    name: 'Url',
    selector: 'url',
    maxWidth: '30px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.url ? <a target="_blank" href={row.url}><Link2 size={20}/></a> : ""}
      </div>
    )
  },
  {
    name: 'Type',
    selector: 'refType',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return row.refType.map((o) => o.name)
    }
   
  },
  
  /*{
    name: 'Url',
    selector: 'url',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.url ? <a  target="_blank" href={row.url}><Link2 size={20}/></a> : null}
      </div>
    )
  },*/
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
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>

          <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end direction='up'>
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