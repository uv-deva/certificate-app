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
import { AbilityContext } from '../../utility/context/Can'
import { useDispatch, useSelector } from 'react-redux'
import { onDeviceCancel, onDevicePause, onDeviceResume, onDeviceToggle, onTableRegister } from '../../redux/actions/table'
import DeviceLoader from '../../components/CellLoader/DeviceLoader'
import { selectUserData } from "../../redux/selectors/auth"


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView, handleMapModalOpen) => {
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()

  const userData = useSelector(selectUserData())


  function handleRegistration(e, row) {
    dispatch(onTableRegister('devices', row.id, {register: !row.mctStatus}))
  }

  function handleToggleMode(e, row) {
    dispatch(onDeviceToggle('devices', row.id, {mode: row?.mctMode?.DeviceMode === '1' ? '0' : '1'}))
  }

  function handleDevicePause(e, row) {
    dispatch(onDevicePause('devices', row.id, {}))
  }

  function handleDeviceResume(e, row) {
    dispatch(onDeviceResume('devices', row.id, {}))
  }

  function handleDeviceCancel(e, row) {
    dispatch(onDeviceCancel('devices', row.id, {}))
  }

  function getDecimalAfterTwoDigits(number) {
    const numStr = number.toString()
  
    if (numStr.length < 3) {
      return number
    }
  
    const firstTwoDigits = numStr.substring(0, 2)
    const decimalPart = numStr.substring(2)
  
    return `${firstTwoDigits}.${decimalPart}`
  }

  return [
    {
      name: "Actions",
      allowOverflow: true,
      maxWidth: "80px",
      cell: (row) => {
        return (
          <div className="d-flex">
            {(ability.can("change", "device") ||
              ability.can("delete", "device") ||
              ability.can("register", "device")) && (
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right direction='up' className="dropdown-menu" aria-labelledby={`dropdownMenuButton`}>
                <div style={{inset: '0px 0px auto auto'}}>
                  {ability.can("change", "device") && (
                    <DropdownItem onClick={(e) => handleEdit(e, row)}>
                      Edit
                    </DropdownItem>
                  )}
                  {ability.can("delete", "device") && (
                    <DropdownItem onClick={(e) => handleDelete(e, row)}>
                      Delete
                    </DropdownItem>
                  )}
                  {ability.can("register", "device") && (
                    <DropdownItem onClick={(e) => handleRegistration(e, row)}>
                      {!row.mctStatus ? "Register" : "Unregister"}
                    </DropdownItem>
                  )}
                  {ability.can("register", "device") && row?.mctStatus && (
                    <>
                    <DropdownItem onClick={(e) => handleToggleMode(e, row)}>
                      {row?.mctDeviceMode === "1" ? "Set to Manual" : "Set to automatic"}
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDevicePause(e, row)}>
                    {"Pause"}
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDeviceResume(e, row)}>
                    {"Resume"}
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDeviceCancel(e, row)}>
                    {"Cancel"}
                    </DropdownItem>
                    </>
                  )}
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </div>
        )
      }
    },
    {
      name: "logo",
      selector:  row => row['image'],
      sortable: true,
      minWidth: "50px",
      maxWidth: "70px",
      cell: (row) => (
        <div
          onClick={(e) => handleView(e, row)}
          className="d-flex align-items-center"
        >
          {!row.refImage ? (
            "NA"
          ) : (
            <img
              height={50}
              width={50}
              src={row.refImage}
              className="avatar-sm"
            />
          )}
        </div>
      )
    },
    {
      name: "Name",
      selector:  row => row['name'],
      sortable: true,
      minWidth: "120px",
      cell: (row) => (
        <div
          onClick={(e) => handleView(e, row)}
          className="d-flex align-items-center  word-break cursor-pointer"
        >
          <div className="user-info text-truncate">
            <span className="d-block font-weight-bold text-truncate">
              {row.name ? row.name : ""}
            </span>
          </div>
        </div>
      )
    },
    {
      name: "Identifier",
      selector:  row => row['identifier'],
      sortable: true,
      minWidth: "120px",
      cell: (row) => (
        <div
          onClick={(e) => handleView(e, row)}
          className="d-flex align-items-center word-break cursor-pointer"
        >
          <div className="user-info ">
            <span className="d-block font-weight-bold word-break">
              {row.identifier}
            </span>
          </div>
        </div>
      )
    },
    {
      name: "Mission Status",
      selector:  row => row['mctStatus'],
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <div
          onClick={(e) => handleView(e, row)}
          className="d-flex align-items-center word-break cursor-pointer"
        >
          <div className="user-info ">
            <span className="d-block font-weight-bold word-break">
              <DeviceLoader row={row} type={'Mission Status'} init={true}/>
            </span>
          </div>
        </div>
      )
    },
    {
      name: "Type",
      selector:  row => row['roles'],
      cell: (row) => (
        <div className="d-flex align-items-center">{row.refType?.name}</div>
      )
    },
    {
      name: "Pilot",
      selector:  row => row['roles'],
      cell: (row) => (
        <div className="d-flex align-items-center">{row.pilot?.first_name}</div>
      )
    },
    {
      name: "Mode",
      selector:  row => row['mctStatus'],
      minWidth: "120px",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className="d-block font-weight-bold word-break">
            <DeviceLoader row={row} type={'Mode'} init={false}/>
          </span>
        </div>
      )
    },
    {
      name: "Position",
      selector:  row => row['mctStatus'],
      minWidth: "150px",
      cell: (row) => (
        <DeviceLoader row={row} type={'Position'} init={false} handleMapModalOpen={handleMapModalOpen}/>
      )
    },
    {
      name: "Heartbeat",
      selector:  row => row['mctStatus'],
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className="d-block font-weight-bold word-break">
            <DeviceLoader row={row} type={'Heartbeat'} init={false}/>
          </span>
        </div>
      )
    },
    {
      name: "Mission Control",
      selector:  row => row['mctStatus'],
      minWidth: "120px",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className="d-block font-weight-bold word-break">
            <DeviceLoader row={row} type={'Mission Control'} init={false}/>
          </span>
        </div>
      )
    },
    ((userData.type === "artificial" || userData.groups[0].name === "administrator") && {
      name: "AI Service",
      selector:  row => row['roles'],
      cell: (row) => (
        <div className="d-flex align-items-center">{row?.ai_service}</div>
      )
    })
  ]
}
