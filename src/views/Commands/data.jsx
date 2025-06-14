// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import { MoreVertical } from 'react-feather'

// ** Custom Components

// ** Utils
import { AbilityContext } from '../../utility/context/Can'


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  return [
    {
      name: 'Actions',
      allowOverflow: true,
      maxWidth: '80px',
      cell: row => {
        return (
          <div className='d-flex'>
            { (ability.can('change', "condition") || ability.can('delete', "condition")) && <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
               <DropdownMenu end direction='up' className="dropdown-menu" aria-labelledby={`dropdownMenuButton`}>
                {ability.can('change', "condition") && <DropdownItem onClick={(e) => handleEdit(e, row)} >Edit</DropdownItem>}
              </DropdownMenu>
            </UncontrolledDropdown>}
          </div>
        )
      }
    },
    {
      name: '#',
      selector:  row => row['id'],
      sortable: true,
      minWidth: '60px',
      maxWidth: '60px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.id ? row.id : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Command Name',
      selector:  row => row['name'],
      sortable: true,
      minWidth: '120px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.name ? row.name : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Identifier',
      selector:  row => row['identifier'],
      sortable: true,
      minWidth: '100px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>

          <div className='user-info '>
            <span className='d-block font-weight-bold word-break'>{row.identifier}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Mission',
      selector:  row => row['mission'],
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.scenario ? row.scenario.identifier : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Device',
      selector:  row => row['device'],
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.device ? row.device.name : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Command',
      selector:  row => row['type'],
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.command_type}
        </div>
      )
    },
    {
      name: 'Action',
      selector:  row => row['command_action'],
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.command_action}
        </div>
      )
    },
    {
      name: 'Order',
      selector:  row => row['order'],
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.order}
        </div>
      )
    }
  ]
}
