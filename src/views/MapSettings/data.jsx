// ** React Imports
import { React, useContext, useEffect } from 'react'
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

import { MoreVertical } from 'react-feather'

// ** Custom Components

// ** Utils
import { AbilityContext } from '../../utility/context/Can'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectTableDataItems } from '../../redux/selectors/table'
import { loadTableMap } from '../../redux/actions/table'
import MissionLoader from '../../components/CellLoader/MissionLoader'


// ** Table Common Column
export const columns = (handleEdit, handleDelete, handleView, handleMapModalOpen) => {
  const dispatch = useDispatch()

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)
  const wayPointsData = useSelector(selectTableDataItems('mapSetting'))

  useEffect(() => {
    dispatch(loadTableMap('mapSetting', 'mapSetting'))
  }, [])

  return [
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        const waypoints = wayPointsData.filter((data) => data.mission[0] === row.id)
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end direction='up' className="dropdown-menu" aria-labelledby={`dropdownMenuButton`}>
                {
                  waypoints.length > 0 ? (
                    <DropdownItem onClick={(e) => handleEdit(e, row)} >Edit</DropdownItem>
                  ) : (
                    <DropdownItem onClick={(e) => handleEdit(e, row)} >Create</DropdownItem>
                  )
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    },
    {
      name: 'Mission ID',
      selector:  row => row['id'],
      sortable: false,
      cell: row => (
        row.id
      )
    },
    {
      name: 'Waypoints',
      selector:  row => row['identifier'],
      sortable: true,
      cell: row => {
        const waypoints = wayPointsData && wayPointsData.filter((data) => data.mission[0] === row.id)
        const urlParts = waypoints.length > 0 && waypoints[0].upload_waypoints.split('/')
        const extractedFileName = urlParts[urlParts.length - 1]
        return (
          <div onClick={(e) => {
            if (waypoints.length > 0) {
              window.open(waypoints[0].upload_waypoints, '_blank')
            }
            handleView(e, row)
          }} className='d-flex align-items-center word-break cursor-pointer'>
            <div className='user-info '>
            { waypoints.length > 0 ? (
              <span className='d-block font-weight-bold word-break'>{extractedFileName}</span>
            ) : ( 
              <span className='d-block font-weight-bold word-break'>{"-"}</span>
            )
            }
            </div>
          </div>
        )
      }
    },

    {
      name: "Show Waypoints",
      selector:  row => row['mctStatus'],
      minWidth: "150px",
      cell: (row) => {
        const waypoints = wayPointsData.filter((data) => data.mission[0] === row.id)
        return (
          <MissionLoader row={waypoints[0]} type={'Position'} init={false} handleMapModalOpen={handleMapModalOpen}/>
        )
      }
    },
    {
      name: 'Show label',
      selector:  row => row['devices'],
      sortable: false,
      cell: row => {
        const waypoints = wayPointsData.filter((data) => data.mission[0] === row.id)

        return (
          <div onClick={(e) => handleView(e, row)} className='d-flex align-items-center word-break cursor-pointer'>
            <div className='user-info '>
            { waypoints.length > 0 ? (
                <span className='d-block font-weight-bold word-break'> {String(waypoints[0].show_waypoints_lable)} </span>
              ) : ( 
                <span className='d-block font-weight-bold word-break'>{"-"}</span>
              )
            }
            </div>
          </div>
        )
      }
    }
  ]
}
