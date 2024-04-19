// ** React Imports
import React, { useContext, useState, useEffect, useMemo } from 'react'

// ** Utils
import { AbilityContext } from '../../utility/context/Can'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import TableWithButtons from "../../components/Tables/index"
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSearchQuery,
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectTableLoading,
  selectTableExecuteLoading,
  selectTableSubmitLoading,
  selectTablePauseLoading,
  selectTableResumeLoading,
  selectTableCancelLoading,
  selectTableRegisteringMain
} from '../../redux/selectors/table'

// ** Third Party Components
import { useIntl } from 'react-intl'
import { Badge } from 'reactstrap'

// ** Tables
import { columns } from './data'
import ScenarioModal from './form'
import {
  initTableData,
  ontTableDataFilter,
  ontTableDataSearch,
  setTableDataPage,
  setTableDataPageSize,
  ontTableDataSort,
  ontTableRowDelete
} from '../../redux/actions/table'
import SpinnerComponent from "@components/spinner/Fallback-spinner"

const Scenarios = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const searchQuery = useSelector(selectSearchQuery('scenarios'))
  const data = useSelector(selectTableDataItems('scenarios'))
  const perPage = useSelector(selectPerPage('scenarios'))
  const currentPage = useSelector(selectTableCurrentPage('scenarios'))
  const totalRows = useSelector(selectTableTotalRows('scenarios'))
  const isLoading = useSelector(selectTableLoading('scenarios'))
  const [loading, setLoading] = useState(isLoading)
  const isSubmitting = useSelector(selectTableSubmitLoading('scenarios'))
  const isExecuting = useSelector(selectTableExecuteLoading('scenarios'))
  const isPausing = useSelector(selectTablePauseLoading('scenarios'))
  const isResuming = useSelector(selectTableResumeLoading('scenarios'))
  const isCancelling = useSelector(selectTableCancelLoading('scenarios'))
  const isRegistering = useSelector(selectTableRegisteringMain('scenarios'))

  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)

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
    return modal ? <ScenarioModal open={modal} handleModal={handleModal} modal={rowData} formType={rowData ? rowData.action : null} /> : null
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
  console.log(modal.commands)
  const showLoading = (isRegistering || isExecuting || isLoading || isSubmitting || isPausing || isResuming || isCancelling)

  return (<React.Fragment>
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#0c5bcf', color:'white'}}>{intl.formatMessage({id:"Missions"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Missions' />
        {isLoading ? (
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
              addLabel={ability.can('add', "scenario") ? "Create Mission" : ""}
              viewModal={renderViewModal}
              handleView={onView}
              setPageSize={setPageSize}
              customPage={'mission'}
            />
          )
        }
      </div>
    </div>
  </React.Fragment>)
}

export default Scenarios
