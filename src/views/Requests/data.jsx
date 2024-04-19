// ** React Imports
import { React, useContext } from 'react'
import moment from 'moment/moment'
// ** Third Party Components
import {
  Badge,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'

// ** Custom Components

// ** Utils
import { AbilityContext } from '../../utility/context/Can'
import { Link } from 'react-router-dom'

const status = {
  true: { title: 'Yes', color: 'light-primary' },
  false: { title: 'No', color: 'light-danger' }
}


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  return [
    {
      name: '#',
      selector:  row => row['id'],
      sortable: true,
      minWidth: '10px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.id ? row.id : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Mission',
      selector:  row => row['mission'],
      sortable: true,
      minWidth: '20px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info text-truncate'>
            <span className='d-block font-weight-bold text-truncate'>{row.scenario ? row.scenario.name : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Type',
      selector:  row => row['types'],
      sortable: true,
      minWidth: '20px',
      cell: row => (
        row.types
      )
    },
    {
      name: 'Contract Address #',
      selector:  row => row['contact_address'],
      cell: row => (
        <div className='d-flex align-items-center'>
          <Link target='_blank' to={`${row.blockchain || 'https://testnet-zkevm.polygonscan.com'}/address/${row.contract_address}`}>{row.contract_address}</Link> 
        </div>
      )
    },
    {
      name: 'Transaction #',
      selector:  row => row['tx_hash'],
      cell: row => (
        <div className='d-flex align-items-center'>
          <Link target='_blank' to={`${row.blockchain || 'https://testnet-zkevm.polygonscan.com'}/tx/${row.tx_hash}`}>{row.tx_hash}</Link> 
        </div>
      )
    },
    {
      name: 'Datetime',
      selector:  row => row['completed_datetime'],
      cell: row => (
        <div className='d-flex align-items-center'>
          {moment(row.completed_datetime).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      )
    },
    {
      name: 'Status',
      selector:  row => row['status'],
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.status}
        </div>
      )
    }
  ]
}
