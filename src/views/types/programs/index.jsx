// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Badge } from 'reactstrap'
import {useIntl} from 'react-intl'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import MaterialTypeModal from './form'
import ViewModal from './view'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTableData, setTableDataPage, ontTableDataSearch, ontTableRowDelete, setTableDataPageSize } from '../../../redux/actions/table'
import { 
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectSearchQuery
} from '../../../redux/selectors/table'

const ProgramTypes = () => {
  const intl = useIntl()
  const [modal, setModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('programTypes'))
  const data = useSelector(selectTableDataItems('programTypes'))
  const perPage = useSelector(selectPerPage('programTypes'))
  const currentPage = useSelector(selectTableCurrentPage('programTypes'))
  const totalRows = useSelector(selectTableTotalRows('programTypes'))
  
  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle for adding new record
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('programTypes', size))
  }

  // ** Function to trigger pagination action
  const setCurrentPage = page => {
    dispatch(setTableDataPage('programTypes', page))
  }

  // ** Function to trigger table search action
  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('programTypes', keyword))
  }

  // ** Function to trigger table filter action
  const onTableFilter = filters => {
    dispatch()
  }

  // ** hook to init the table with type & url for populating it via saga
  useEffect(() => {
    dispatch(initTableData('programTypes', 'programTypes'))
  }, [])

  // ** renders the view modal based on modal state
  const renderViewModal = () => {
    return viewModal ? <ViewModal open={viewModal} handleModal={handleViewModal} modal={rowData} /> : null
  }

  // ** renders the modal based on modal state
  const renderModal = () => {
    return modal ? <ProgramTypeModal open={modal} handleModal={handleModal} modal={rowData} /> : null
  }

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('nodeTypes', row.id))
  }

  // ** Function to handle edit action of the row
  // params : e = Event
  //          row = row data  
  const onEdit = (e, row) => {
    e.preventDefault() 
    setRowData(row)
    setModal(!modal)
  }

  // ** Function to handle view action of the row
  // params : e = Event
  //          row = row data  
  const onView = (e, row) => {
    e.preventDefault() 
    setRowData({...row})
    setViewModal(!viewModal)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id:"Program Types"})} breadCrumbParent='System' breadCrumbActive='Program Types' />
      <Row>
        <Col sm='12'>
          <TableWithButtons
            currentPage={currentPage}
            perPage={perPage}
            data={data}
            columns={columns}  
            setCurrentPage={setCurrentPage}
            totalRows={totalRows}
            searchQuery={searchQuery}
            onSearch={onTableSearch}
            onFilter={onTableFilter}
            modal={renderModal}
            handleModal={handleModal}
            addLabel={intl.formatMessage({id:"Add Program Types"})}
            handleDelete={onDelete}
            handleEdit={onEdit}
            viewModal={renderViewModal}
            handleView={onView}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ProgramTypes
