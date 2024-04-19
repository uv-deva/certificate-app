// ** React Imports
import React, { useContext, useState, useEffect, useMemo } from "react"

// ** Utils
import { AbilityContext } from "../../utility/context/Can"

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import TableWithButtons from "../../components/Tables/index"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSearchQuery,
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectTableLoading,
  selectTableDeletingMain
} from "../../redux/selectors/table"

// ** Third Party Components
import { useIntl } from 'react-intl'
import { Badge } from 'reactstrap'

// ** Tables
import { columns } from "./data"
import AccountModal from "./form"
import ViewModal from './view'

import {
  initTableData,
  ontTableDataFilter,
  ontTableDataSearch,
  setTableDataPage,
  setTableDataPageSize,
  ontTableDataSort,
  ontTableRowDelete,
  onCellLoading
} from "../../redux/actions/table"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import MapModal from "../../components/common/MapModal"
import { selectUserData } from "../../redux/selectors/auth"

const Devices = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const searchQuery = useSelector(selectSearchQuery("devices"))
  const data = useSelector(selectTableDataItems("devices"))
  const perPage = useSelector(selectPerPage("devices"))
  const currentPage = useSelector(selectTableCurrentPage("devices"))
  const totalRows = useSelector(selectTableTotalRows("devices"))
  const isLoading = useSelector(selectTableLoading("devices"))
  const [loading, setLoading] = useState(isLoading)
  const isDeleting = useSelector(selectTableDeletingMain("devices"))
  const userData = useSelector(selectUserData())

  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [mapData, setMapData] = useState({ lat: 0, long: 0})
  const [isMapOpen, setIsMapOpen] = useState(false)

  const [rowData, setRowData] = useState(null)
  const [currentFilter, setCurrentFilter] = useState("Yes")

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  const filters = [
    {
      label: "only Active Devices",
      id: "onlyActive",
      values: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    }
  ]

  // ** Function to handle view Map Modal toggle with selected lat long
  const handleMapModalOpen = (lat, long, deviceId, waypoints, wayPointsStatus, wayPointsLabel, iconColor, iconType) => {
    setMapData({ lat, long, deviceId, waypoints, flag: 'devices', wayPointsStatus, wayPointsLabel, iconType, iconColor })
    setIsMapOpen(true)
  }

  // ** Function to handle View Modal toggle
  const handleViewModal = () => {
    setRowData({})
    setViewModal(!viewModal)
  }

  // ** Function to handle Modal toggle for adding new record
  const handleModal = () => {
    setRowData(null)
    setModal(!modal)
  }

  const setPageSize = (size) => {
    dispatch(setTableDataPageSize("devices", size))
  }

  // ** Function to trigger pagination action
  const setCurrentPage = (page) => {
    dispatch(setTableDataPage("devices", page))
  }

  // ** Function to trigger table search action
  const onTableSearch = (keyword) => {
    dispatch(ontTableDataSearch("devices", keyword))
  }

  // ** Function to trigger table filter action
  const onTableFilter = (filter) => {
    setCurrentFilter(filter.onlyActive === true ? "Yes" : "No")
    dispatch(ontTableDataFilter("devices", filter))
  }

  // ** hook to init the table with type & url for populating it via saga
  useEffect(() => {
    dispatch(initTableData("devices", "devices"))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault()
    if (confirm("Are you sure, you want to delete?")) dispatch(ontTableRowDelete("devices", row.id))
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
    return viewModal ? (
      <ViewModal
        open={viewModal}
        onEdit={onEdit}
        handleModal={handleViewModal}
        modal={rowData}
      />
    ) : null
  }

  // ** renders the modal based on modal state
  const renderModal = () => {
    return modal ? (
      <AccountModal open={modal} handleModal={handleModal} modal={rowData} />
    ) : null
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
    dispatch(ontTableDataSort("devices", column.selector, sortDirection))
  }

  const showLoading = isLoading || isDeleting

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (isMapOpen) {
        const filteredMapData = data.filter((d) => {
          return d.id === mapData.deviceId
        })
        filteredMapData.map((d) => {
          setMapData({
            lat: d?.mctMode?.Position?.latitude,
            long: d?.mctMode?.Position?.longitude,
            deviceId: d.id,
            waypoints: d?.way_points_data?.waypoints,
            wayPointsStatus: d?.way_points_data?.show_waypoints,
            wayPointsLabel: d?.way_points_data?.show_waypoints_lable,
            iconType: d?.way_points_data?.map_icon_type,
            iconColor: d?.way_points_data?.map_icon_color
          })
        })
      }
      const filteredData = data.filter((d) => {
        return d.mctStatus === true
      })
      const getIds = filteredData.map((d) => {
        return d.id
      })
      for (const ids of getIds) {
        dispatch(onCellLoading("devices", ids, {}))
      }
    }, Number(userData.refresh_rate) * 1000)
    return () => clearInterval(intervalId) //This is important
  }, [data])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
        <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#0c5bcf', color:'white'}}>{intl.formatMessage({id:"Devices"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Devices' />
          {showLoading ? (
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
              addLabel={ability.can("add", "device") ? "Add Device" : ""}
              viewModal={renderViewModal}
              handleView={onView}
              setPageSize={setPageSize}
              currentFilter={currentFilter}
            />
          )}
        </div>
        {userData.map_feature && (
          <MapModal
            mapData={mapData}
            isMapOpen={isMapOpen}
            setIsMapOpen={setIsMapOpen}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default Devices
