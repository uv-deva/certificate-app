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


// ** Utils
import { AbilityContext } from './../../utility/context/Can'
import { useDispatch, useSelector } from 'react-redux'
import { onMissonCancel, onMissonExecute, onMissonPause, onMissonResume, onMissonSubmit, onTableRegister } from '../../redux/actions/table'
import ScenarioLoader from '../../components/CellLoader/ScenarioLoader'
import { selectUserData } from "../../redux/selectors/auth"

const status = {
  true: { title: 'Yes', color: 'light-primary' },
  false: { title: 'No', color: 'light-danger' }
}


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView) => {
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData())

  function handleExecution(e, row) {
    console.log(e, row)
    dispatch(onMissonExecute('scenarios', row.id))
  }

  function handleSubmission(e, row) {
    console.log(e, row)
    dispatch(onMissonSubmit('scenarios', row.id))
  }

  function handlePausing(e, row) {
    console.log(e, row)
    dispatch(onMissonPause('scenarios', row.id))
  }

  function handleResuming(e, row) {
    console.log(e, row)
    dispatch(onMissonResume('scenarios', row.id))
  }

  function handleCancelling(e, row) {
    console.log(e, row)
    dispatch(onMissonCancel('scenarios', row.id))
  }

  function handleRegistration(e, row) {
    dispatch(onTableRegister('scenarios', row.id, {register: !row.missionControlStatus}))
  }

  return [
    {
      name: 'Actions',
      allowOverflow: true,
      maxWidth: '80px',
      cell: row => {
        let canEdit = (row.missionControlStatus && (row.mctStatus.status === 'Created'))
        let canSubmit = (row.missionControlStatus && (row.mctStatus.status === 'Created'))
        let canExecute = (row.missionControlStatus && (row.mctStatus.status === 'Submitted'))
        let canPause = (row.missionControlStatus && (row.mctStatus.status === 'Execution'))
        let canResume = (row.missionControlStatus && (row.mctStatus.status === 'Stopped'))
        let canCancel = (row.missionControlStatus && (row.mctStatus.status === 'Execution'))

        canEdit = canSubmit = canExecute = canPause = canResume = canCancel = row.missionControlStatus
        return (
          <div className='d-flex'>
            { (ability.can('change', "scenario") || ability.can('delete', "scenario")) && <UncontrolledDropdown>
              <DropdownToggle className="icon-btn hide-arrow" color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
               <DropdownMenu right direction='up' className="dropdown-menu" aria-labelledby={`dropdownMenuButton`}>
               <div style={{inset: '0px 0px auto auto'}}>
                  {ability.can('register', "scenario") && <DropdownItem onClick={(e) => handleRegistration(e, row)} >{!row.missionControlStatus ? "Register" : "Unregister"}</DropdownItem>}
                  {ability.can('change', "scenario") && canEdit && <DropdownItem onClick={(e) => handleEdit(e, row)} >Edit</DropdownItem>}
                  {ability.can('change', "scenario") && canSubmit && <DropdownItem onClick={(e) => handleSubmission(e, row)} >Submit</DropdownItem>}
                  {ability.can('change', "scenario") && canExecute && <DropdownItem onClick={(e) => handleExecution(e, row)} >Execute</DropdownItem>}
                  {ability.can('change', "scenario") && canPause && <DropdownItem onClick={(e) => handlePausing(e, row)} >Pause</DropdownItem>}
                  {ability.can('change', "scenario") && canResume && <DropdownItem onClick={(e) => handleResuming(e, row)} >Resume</DropdownItem>}
                  {ability.can('change', "scenario") && canCancel && <DropdownItem onClick={(e) => handleCancelling(e, row)} >Cancel</DropdownItem>}
                  {ability.can('change', "scenario") && userData.type === 'artificial' && canEdit && <DropdownItem onClick={(e) => handleEdit(e, {...row, action: 'command'})} >Create Command and Condition</DropdownItem>}
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>}
          </div>
        )
      }
    },
    {
      name: 'Scenario Name',
      selector:  row => row['name'],
      sortable: true,
      maxWidth: '200px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center  word-break cursor-pointer'>
          <div className='user-info word-break'>
            <span className='d-block font-weight-bold word-break'>{row.name ? row.name : ""}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Mission ID',
      selector:  row => row['id'],
      sortable: false,
      maxWidth: '80px',
      cell: row => (
        row.id
      )
    },
    {
      name: 'Identifier',
      selector:  row => row['identifier'],
      sortable: true,
      maxWidth: '150px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>

          <div className='user-info '>
            <span className='d-block font-weight-bold word-break'>{row.identifier}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Devices',
      selector:  row => row['devices'],
      sortable: false,
      maxWidth: '150px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>

          <div className='user-info '>
            <span className='d-block font-weight-bold word-break'>
              {row.refDevice.map((item, index) => { return <span key={index}>{item.name}{index !== row.refDevice.length - 1 ? ', ' : ''}</span> })}</span>
          </div>
        </div>
      )
    },
    ((userData.type === "artificial" || userData.groups[0].name === "administrator") ? {
      name: "AI Service",
      selector:  row => row['roles'],
      cell: (row) => (
        <div className="d-flex align-items-center">{row?.ai_service}</div>
      )
    } : {
      name: "",
      minWidth:'0px',
      maxWidth: '0px'
    }),
    {
      name: 'Mission Control',
      selector:  row => row['missionControlStatus'],
      maxWidth: '150px',
      cell: row => (
        <div className='d-flex align-items-center'>
            <ScenarioLoader row={row} type={'Mission Control'} init={true}/>
        </div>
      )
    },
    {
      name: 'Status',
      selector:  row => row['roles'],
      maxWidth: '80px',
      cell: row => (
        <div className='d-flex align-items-center'>
            <ScenarioLoader row={row} type={'Status'} init={false}/>
        </div>
      )
    },
    {
      name: 'Pilots',
      selector:  row => row['pilots'],
      sortable: false,
      maxWidths: '150px',
      cell: row => (
        <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>

          <div className='user-info '>
            <span className='d-block font-weight-bold word-break'>
              {row.refDevice.map((item, index) => { return <span key={index}>{item?.pilot?.first_name}{index !== row.refDevice.length - 1 ? ', ' : ''}</span> })}</span>
          </div>
        </div>
      )
    }
  ]
}
