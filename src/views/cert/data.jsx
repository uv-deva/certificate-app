// ** React Imports
import { useContext, useState } from 'react'

// ** Third Party Components
import { Edit2, Trash2, Link2, Folder, Eye, MoreVertical } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Modal, ModalBody } from 'reactstrap'
import { useIntl } from 'react-intl'
import { mdiQrcode } from '@mdi/js'
import { QRCodeCanvas } from "qrcode.react"

// ** Custom Components
import Avatar from '@components/avatar'
import InfoModal from '@src/components/InfoModal'

// ** Vars
const status = {
    true: { title: 'Active', color: 'light-primary' },
    false: { title: 'In-Active', color: 'light-danger' }
}

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'
import { downloadCertificate } from '../../redux/actions/certificate'
import { useDispatch } from 'react-redux'

// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
const intl = useIntl()
const dispatch = useDispatch()
// ** ACL Ability Context
const ability = useContext(AbilityContext)
const [qrcodeData, setQrcodeData] = useState([])
const [qrcodeModal, setQrcodeModal] = useState(false)

const target = `${document.location.origin}/certificates/data`

const downloadQRCode = () => {
  const canvas = document.querySelector("#qrcode-canvas")
  if (!canvas) throw new Error("<canvas> not found in the DOM")

    const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream")
    console.log(pngUrl)
  const downloadLink = document.createElement("a")
  downloadLink.href = pngUrl
  downloadLink.download = "QRCode.png"
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

return [  
  {
    name: '',
    selector: 'refImage',
    sortable: true,
    minWidth:'100px',
    maxWidth:'100px',
    cell: row => (
      <div className='d-flex align-items-center'>
         {!row?.refProgram[0]?.refImage ? (
          <Avatar  size={'lg'} color={`grey`} content={row.name} initials style={{cursor:'default'}} />
        ) : (
          <Avatar imgHeight={50} imgWidth={50} img={row?.refProgram[0]?.refImage} style={{cursor:'default'}} />
        )}

      </div>
    )
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
              {ability.can('view', "certificate") && <DropdownItem href={'#'} onClick={(e) => handleView(e, row)}>
                <Eye className="cursor-pointer " style={{ color: 'green' }} size={20} /> <span className='align-middle'>{"View"}</span>
              </DropdownItem>}
              {/* {ability.can('change', "certificate") && <DropdownItem href="#" onClick={(e) => handleEdit(e, row)} >
                <Edit2 className="cursor-pointer" style={{ color: 'green' }} size={20} /> <span className='align-middle'>{"Edit" })}</span>
              </DropdownItem>} */}
              {ability.can('delete', "certificate") && <DropdownItem href="#" onClick={(e) => handleDelete(e, row)} >
                <Trash2 className="cursor-pointer " style={{ color: 'red' }} size={20} /> <span className='align-middle'>{"Delete"}</span>
              </DropdownItem>}
            </DropdownMenu>
          </UncontrolledDropdown>

        </div>
      )
    }
  },
  {
    name: '',
    selector: 'QR-code',
    sortable: true,
    minWidth:'100px',
    maxWidth:'100px',
    cell: row => (
      <div className="d-flex align-items-center">
          <Button className="p-0 text-left" color='default' outline onClick={() => {
            setQrcodeModal(!qrcodeModal)
            setQrcodeData(row)
            }}
          >
            <svg viewBox="0 0 24 24" width="50" height="50" fill="#dd792f"> <path d={mdiQrcode}/></svg>
          </Button>
          
            <Modal style={{width: '345px', height: '390px', overflow: 'hidden', marginTop: '15%'}} isOpen={qrcodeModal} toggle={() => setQrcodeModal(!qrcodeModal)}>
              <ModalBody>
                <QRCodeCanvas id="qrcode-canvas" level="H" value={`${target}/${qrcodeData.id}`} size={300} />
                <button onClick={downloadQRCode} style={{margin: '5% 0% 0% 25%', background: '#dd792f', width: '150px', height: '40px'}}>Download</button>
              </ModalBody>
            </Modal>
      </div>
    )
  },
  {
    name: 'Identifier',
    selector: 'identifier',
    minWidth: '30px',
    sortable: true,
    cell: row => <div className='cursor-pointer' onClick={(e) => handleView(e, row)}>{row?.identifier}</div>
  },
  {
    name: 'Account (Student)',
    selector: 'refAccount',
    sortable: true, //.substring(0, 7);
    minWidth: '150px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>

      <div className='user-info '>
        <span className='d-block font-weight-bold word-break'> <InfoModal smallText={row.refAccount[0]?.username} largeText={row.refAccount[0]?.first_name} /></span>
      </div>
    </div>

  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth:'150px',
    cell: row => (
      <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>
        
        <div className='user-info '>
          <span className='d-block font-weight-bold word-break'>{row.name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Program',
    selector: 'refProgram',
    sortable: true, //.substring(0, 7);
    minWidth: '160px',
    cell: row => <div className='d-flex align-items-center word-break text-truncate '>
        
    <div className='user-info '>
      <span className='d-block font-weight-bold word-break'> <InfoModal smallText={row.description.substring(0, 50)} largeText={row.description} /></span>
    </div>
  </div>
    
  },
  {
    name: 'Certificate (PDF)',
    selector: 'id',
    cell: row => (
      <div className='d-flex align-items-center word-break text-truncate '>
          {row?.refProgram[0]?.template !== null ? <Folder onClick={() => dispatch(downloadCertificate(row.id))} size={20}/> : null}
      </div>
    )
  },
  {
    name: 'Transaction',
    selector: 'transaction',
    maxWidth: '70px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <a target="_blank" href="https://sepolia.arbiscan.io/tx/0x325cb1b473908fa7b776d5eb490580676f15d9a7dfe89730876a46bb11231807"><Link2 size={20} /></a>
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
  }
]
}