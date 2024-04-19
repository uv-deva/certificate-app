// ** React Imports
import React, { useContext, useState, useEffect, useMemo } from 'react'

// ** Utils
import { AbilityContext } from '../../utility/context/Can'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import MapModal from "../../components/common/MapModal.js"
import TableWithButtons from '../../components/Tables/index'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSearchQuery,
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectTableLoading
} from '../../redux/selectors/table'

// ** Third Party Components
import { useIntl } from 'react-intl'
import { Badge } from 'reactstrap'

// ** Tables
import { columns } from './data'
import WayPointModal from './form'
import {
  initTableData,
  ontTableDataFilter,
  ontTableDataSearch,
  setTableDataPage,
  setTableDataPageSize,
  ontTableDataSort,
  ontTableRowDelete,
  loadTableMap
} from '../../redux/actions/table'
import SpinnerComponent from "@components/spinner/Fallback-spinner"

const MapSettings = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const searchQuery = useSelector(selectSearchQuery('scenarios'))
  const data = useSelector(selectTableDataItems('scenarios'))
  const wayPointsData = useSelector(selectTableDataItems('mapSetting'))
  const perPage = useSelector(selectPerPage('scenarios'))
  const currentPage = useSelector(selectTableCurrentPage('scenarios'))
  const totalRows = useSelector(selectTableTotalRows('scenarios'))
  const isLoading = useSelector(selectTableLoading('scenarios'))
  const [loading, setLoading] = useState(isLoading)

  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)

  const [mapData, setMapData] = useState({ lat: 0, long: 0})
  const [isMapOpen, setIsMapOpen] = useState(false)

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  const filters = [
    {
      label: "Account",
      id: "create_account",
      values: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    }
  ]


  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle for adding new record
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('scenarios', size))
  }

  // ** Function to trigger pagination action
  const setCurrentPage = page => {
    dispatch(setTableDataPage('scenarios', page))
  }

  // ** Function to trigger table search action
  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('scenarios', keyword))
  }

  // ** Function to trigger table filter action
  const onTableFilter = filter => {
    dispatch(ontTableDataFilter('scenarios', filter))
  }

  // ** hook to init the table with type & url for populating it via saga
  useEffect(() => {
    dispatch(initTableData('scenarios', 'scenarios'))
    dispatch(loadTableMap('mapSetting', 'mapSetting'))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault()
    if (confirm("Are you sure, you want to delete?")) dispatch(ontTableRowDelete('scenarios', row.id))
  }

  // ** Function to handle edit action of the row
  // params : e = Event
  //          row = row data  
  const onEdit = (e, row) => {
    e.preventDefault()
    setViewModal(false)
    setRowData(row)
    setModal(!modal)
  }

  // ** renders the view modal based on modal state
  const renderViewModal = () => {
    // return viewModal ? <ViewModal open={viewModal} onEdit={onEdit} handleModal={handleViewModal} modal={rowData} /> : null
  }

  // ** renders the modal based on modal state
  const renderModal = () => {
    return modal ? <WayPointModal open={modal} handleModal={handleModal} modal={rowData} wayPoints={wayPointsData} /> : null
  }


  // ** Function to handle view action of the row
  // params : e = Event
  //          row = row data  
  const onView = (e, row) => {
    e.preventDefault()
    setRowData({ ...row })
    setViewModal(!viewModal)
  }

  // ** Function to handle sort action of the rows
  // params : column = name of the field
  //          direction = Sort Direction
  const handleSort = (column, sortDirection) => {
    dispatch(ontTableDataSort('scenarios', column.selector, sortDirection))
  }

  // ** Function to handle view Map Modal toggle with selected lat long
  const handleMapModalOpen = (lat, long, deviceId, waypoints, wayPointsStatus, wayPointsLabel, mapIconType, mapIconColor) => {
    setMapData({ lat, long, deviceId, waypoints, flag: 'mapSetting', wayPointsStatus, wayPointsLabel, iconType: mapIconType, iconColor: mapIconColor })
    setIsMapOpen(true)
  }

  return (<React.Fragment>
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#0c5bcf', color:'white'}}>{intl.formatMessage({id:"Map Settings"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Map Settings' />
        {
          isLoading ? (
            <SpinnerComponent setLoading={setLoading} />
          ) : (
            <TableWithButtons
              currentPage={currentPage}
              perPage={perPage}
              onSort={handleSort}
              data={data}
              columns={columns}
              setCurrentPage={setCurrentPage}
              totalRows={totalRows}
              searchQuery={searchQuery}
              onSearch={onTableSearch}
              onFilter={onTableFilter}
              filters={filters}
              modal={renderModal}
              handleModal={handleModal}
              handleDelete={onDelete}
              handleEdit={onEdit}
              handleMapModalOpen={handleMapModalOpen}
              addLabel={ability.can('add', "waypoints") ? "" : ""}
              viewModal={renderViewModal}
              handleView={onView}
              setPageSize={setPageSize}
              customPage={'mission'}
            />
          )
        }
      </div>
      {(
          <MapModal
            mapData={mapData}
            isMapOpen={isMapOpen}
            setIsMapOpen={setIsMapOpen}
          />
      )}
    </div>
  </React.Fragment>)
}

export default MapSettings
